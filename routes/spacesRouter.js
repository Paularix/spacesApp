import express from 'express';
import multer from 'multer';
import {sequelize} from "../loadSequelize.js";
import {Spaces} from '../models/Models.js';


const router = express.Router();

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

        Spaces.findOne({ where: { id: req.params.id } })
            .then(al => res.json({
                ok: true,
                data: al
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'fotos')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');


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