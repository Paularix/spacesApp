import express from 'express';
import multer from 'multer';
import jsonwebtoken from 'jsonwebtoken';
import { sequelize } from "../loadSequelize.js";
import { authenticate, authError } from './middleware.js';
import { Services, SpaceServices, Users, Dates, Spaces } from '../models/Models.js';
import { Op } from 'sequelize';

Spaces.belongsToMany(Services, { through: "SpaceServices", foreignKey: "rid_space" })
Spaces.hasMany(Dates, { foreignKey: "spaces_id_space" })

const router = express.Router();

const locations = {

    Barcelona: {
        maxLatLimit: 41.5,
        minLatLimit: 41.1,
        minLonLimit: 2.0,
        maxLonLimit: 2.4
    },
    Hospitalet: {
        maxLatLimit: 41.347364,
        minLatLimit: 41.335025,
        minLonLimit: 2.085028,
        maxLonLimit: 2.151676
    },
    Terrassa: {
        maxLatLimit: 41.573957,
        minLatLimit: 41.335025,
        minLonLimit: 2.018239,
        maxLonLimit: 2.018564
    }
}




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photos-spaces')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');

// GET spaces
// @desc obtener todos los spaces de BD que cumplan con la query por fecha y localización
router.get('/find', function (req, res, next) {

    sequelize.sync().then(() => {
        Spaces.findAll({
            where: {
                lat: {
                    [Op.between]: [locations[req.query.location].minLatLimit, locations[req.query.location].maxLatLimit]
                },
                long: {
                    [Op.between]: [locations[req.query.location].minLonLimit, locations[req.query.location].maxLonLimit]
                },
                status: "public",
            },
            include: [{
                model: Dates,
                attributes: ['date'],
            }]
        })
            .then((spaces) => {
                console.log('spaces', spaces)
                const dateFrom = new Date(req.query.from).getTime()
                const dateTo = new Date(req.query.to).getTime()

                let results = []

                for (let space of spaces) {
                    // Unica date

                    let conflictDates = space.Dates.filter(date => (new Date(date.date).getTime() >= dateFrom) && (dateTo >= new Date(date.date).getTime()))
                    console.log(conflictDates)
                    if (conflictDates.length == 0) {
                        results.push(space)
                    }
                }

                res.json({
                    ok: true,
                    data: results
                })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    ok: false,
                    error: error.message
                })
            })

    }).catch(error => {
        console.log(error)
        res.json({
            ok: false,
            error: error.message
        })
    });

});


// GET spaces
// @desc obtener todos los spaces de BD
router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Spaces.findAll()
            .then(spaces => res.json({
                ok: true,
                data: spaces
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});

// GET de un solo spaces
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Spaces.findOne({
            where: { id: req.params.id },
            include: [{
                model: Users,
                required: true
            }, {
                model: Dates,
                as: 'Dates'
            }, {
                model: Services
            }]
        })
            .then(al => res.json({
                ok: true,
                data: al
            }))
            .catch(error => {
                console.log(error)
                res.json({
                    ok: false,
                    error: error
                })}
            )

    }).catch((error) => {
        console.log(error)
        res.json({
            ok: false,
            error: error
        })
    });
});


// GET información protegida de los espacios del usuario
// @desc ruta protegida perfil de usuario
router.get("/auth/mySpaces", [authenticate, authError], (req, res) => {
    const token = req.headers.authorization || ''
    if (token) {
        const decoded = jsonwebtoken.decode(token)
        sequelize.sync().then(() => {
            Spaces.findAll({ where: { rid_host_user: decoded.id } })
                .then(spaces => {
                    res.status(200).json({
                        ok: true,
                        data: spaces
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        ok: false,
                        error
                    })
                })
        })
            .catch((error) => {
                res.status(400).json({
                    ok: false,
                    error
                })
            })

    }
})

// GET de un solo spaces
// @desc información del espacio que se desea editar
router.get('/auth/edit/:id', [authenticate, authError], function (req, res, next) {
    const token = req.headers.authorization || ''
    sequelize.sync().then(() => {
        const decoded = jsonwebtoken.decode(token)
        Spaces.findOne({
            where: {
                id: req.params.id,
                rid_host_user: decoded.id
            },
            include: [{
                model: SpaceServices,
                model: Services
            }, {
                model: Dates
            }]
        })
            .then(al => {
                res.json({
                    ok: true,
                    data: al
                })
            })
            .catch(error => res.json({
                ok: false,
                error: error
            }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

// PUT de un solo spaces
// @desc actualizar información del espacio que se desea editar
router.put('/auth/edit/:id', [authenticate, authError], function (req, res, next) {
    const token = req.headers.authorization || ''
    const decoded = jsonwebtoken.decode(token)
    upload(req, res, function (err) {
        if (err) {
            console.log("error uploading the file")
            console.log(err)
            return res.status(500).send("Error uploading file")
        } else {
            sequelize.sync().then(() => {

                const space = JSON.parse(req.body.newSpace)
                const selectedDates = JSON.parse(req.body.selectedDates)

                console.log(space)
                console.log(selectedDates)

                const updateSpace = {
                    id: space.id,
                    name: space.name,
                    address: space.address,
                    description: space.description,
                    rules: space.rules,
                    capacity: space.capacity,
                    price: Number(space.price),
                    rid_host_user: Number(decoded.id),
                    status: space.status,
                    lat: space.approximateCoords[0],
                    long: space.approximateCoords[1],
                }


                Spaces.findOne({
                    where: {
                        id: req.params.id,
                        rid_host_user: decoded.id
                    },
                })
                    .then(foundSpace => {
                        if (foundSpace) {
                            foundSpace.update(updateSpace)
                        }
                        if (req.file) {
                            foundSpace.update({space_picture: req.file.filename})
                        }
                        return foundSpace
                    })
                    .then((foundSpace) => {
                        Dates.destroy({where: {spaces_id_space: req.params.id}})
                        
                        for (let date of selectedDates) {
                            console.log(date)
                            Dates.create({
                                date: date,
                                available: false,
                                spaces_id_space: foundSpace.id
                            })
                            .then(created => console.log("Created:", created ))
                            .catch(error => console.log(error))

                        }

                        return foundSpace
                    })
                    .then(foundSpace => {
                        for (let service of space.services) {
                            SpaceServices.create({
                                rid_space: foundSpace.id,
                                rid_service: service
                            })
                        }
                        return foundSpace
                    })
                    .then((foundSpace) => {
                        res.json({
                            ok: true,
                            data: foundSpace
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.json({
                            ok: false,
                            error: error
                        })
                    });

            })
            .catch((error) => {
                console.log("syncErr", error)
                res.json({
                    ok: false,
                    error: error
                })
            });
        }
    })
});

// POST subir espacio
// @desc ruta protegida para subir espacio 
router.post("/auth", [authenticate, authError], (req, res) => {

    upload(req, res, function (err) {
        if (err) {
            console.log("error uploading the file")
            console.log(err)
            return res.status(500).send("Error uploading file")
        } else {
            console.log("file uploaded")
            sequelize.sync().then(() => {
                const token = req.headers.authorization || ''
                const decoded = jsonwebtoken.decode(token)
                const newSpace = JSON.parse(req.body.newSpace)
                const selectedDates = JSON.parse(req.body.selectedDates)

                const spaceToBeSaved = {
                    name: newSpace.name,
                    address: newSpace.address,
                    description: newSpace.description,
                    rules: newSpace.rules,
                    capacity: newSpace.capacity,
                    price: Number(newSpace.price),
                    rid_host_user: Number(decoded.id),
                    status: newSpace.status,
                    lat: newSpace.approximateCoords[0],
                    long: newSpace.approximateCoords[1],
                }


                Spaces.create(spaceToBeSaved)
                    .then(item => {
                        if (req.file) {
                            item.update({
                                space_picture: req.file.filename
                            })
                        }
                        return item
                    })
                    .then(item => {
                        for (let date of selectedDates) {
                            console.log(item.id)

                            Dates.create({
                                date: date,
                                available: false,
                                spaces_id_space: item.id
                            }).then(date => console.log("Date created:", date))
                                .catch(err => console.log(err))
                        }

                        return item
                    })
                    .then(item => {
                        for (let service of newSpace.services) {
                            SpaceServices.create({
                                rid_space: item.id,
                                rid_service: service
                            })
                        }
                        return item
                    })
                    .then((item) => {
                        return res.json({
                            ok: true,
                            data: item
                        })
                    })
                    .catch((error) => {
                        return res.json({
                            ok: false,
                            error: error.message
                        })
                    })

            })
                .catch((error) => {
                    return res.json({
                        ok: false,
                        error: error.message
                    })
                });

        }

    })
})


// POST, creació d'un nou spaces
router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {

        Spaces.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error: error.message }))


    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
});


// put modificació d'un spaces
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Spaces.findOne({ where: { id: req.params.id } })
            .then(spaces_trobat =>
                spaces_trobat.update(req.body)
            )
            .then(spaces_modificat => res.json({
                ok: true,
                data: spaces_modificat
            }))
            .catch(error => res.json({
                ok: false,
                error: error.message
            }));

    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
});



// DELETE elimina l'spaces id
router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {

        Spaces.destroy({ where: { id_space: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});





router.post('/foto/:id', (req, res, next) => {

    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err)
        }
        Spaces.findOne({ where: { id: req.params.id } })
            .then(spaces_trobat =>
                spaces_trobat.update({
                    img: req.file.originalname
                })
                    .catch(error => res.json({
                        ok: false,
                        error: error.message
                    }))
            )
        return res.status(200).send(req.file)
    })

});

export default router;
