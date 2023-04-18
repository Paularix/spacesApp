import express from 'express';
import {sequelize} from "../loadSequelize.js";
import {Dates} from '../models/Models.js';


const router = express.Router();

// GET dates
// @desc obtener todos los dates de BD
router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Dates.findAll()
            .then(dates => res.json({
                ok: true,
                data: dates
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

// GET de un solo dates
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Dates.findOne({ where: { id: req.params.id } })
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

export default router;
