import express from 'express';
import multer from 'multer';
import {sequelize} from "../loadSequelize.js";
import {Users} from '../models/Models.js';


const router = express.Router();

// GET users
// @desc obtener todos los users de BD
router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Users.findAll()
            .then(users => res.json({
                ok: true,
                data: users
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

// GET de un solo users
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Users.findOne({ where: { id: req.params.id } })
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



// POST, creació d'un nou users
router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {

        Users.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error: error.message }))


    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
});


// put modificació d'un users
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Users.findOne({ where: { id: req.params.id } })
            .then(users_trobat =>
                users_trobat.update(req.body)
            )
            .then(users_modificat => res.json({
                ok: true,
                data: users_modificat
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



// DELETE elimina l'users id
router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {

        Users.destroy({ where: { id_space: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});




export default router;
