import express from 'express';
import multer from 'multer';
import {sequelize} from "../loadSequelize.js";
import {Bookings} from '../models/Models.js';
import {authError} from './middleware.js'
import {authenticate} from './middleware.js'

const router = express.Router();

// POST, creació d'un amb status 0 (requested) 
// @desc sube un booking a BD pendiende de aceptar
router.post('/', [authenticate, authError],function (req, res, next) {
   console.log(req.body)
   res.status(200).json({
        ok: true,
        data: req.body
   })
   
    // sequelize.sync().then(() => {

    //     Bookings.create(req.body)
    //         .then((item) => res.json({ ok: true, data: item }))
    //         .catch((error) => res.json({ ok: false, error: error.message }))


    // }).catch((error) => {
    //     res.json({
    //         ok: false,
    //         error: error.message
    //     })
    // });
});


// GET bookings
// @desc obtener todos los bookings de BD
router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Bookings.findAll()
            .then(bookings => res.json({
                ok: true,
                data: bookings
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

// GET de un solo bookings
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Bookings.findOne({ where: { id: req.params.id } })
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



// POST, creació d'un nou bookings
router.post('/', function (req, res, next) {
    sequelize.sync().then(() => {

        Bookings.create(req.body)
            .then((item) => res.json({ ok: true, data: item }))
            .catch((error) => res.json({ ok: false, error: error.message }))


    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
});


// put modificació d'un bookings
router.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Bookings.findOne({ where: { id: req.params.id } })
            .then(bookings_trobat =>
                bookings_trobat.update(req.body)
            )
            .then(bookings_modificat => res.json({
                ok: true,
                data: bookings_modificat
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



// DELETE elimina l'bookings id
router.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {

        Bookings.destroy({ where: { id_space: req.params.id } })
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
