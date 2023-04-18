import express from 'express';
import {sequelize} from "../loadSequelize.js";
import {Preferences} from '../models/Models.js';


const router = express.Router();

// GET preferences
// @desc obtener todos los preferences de BD
router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Preferences.findAll()
            .then(preferences => res.json({
                ok: true,
                data: preferences
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

// GET de un solo preferences
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Preferences.findOne({ where: { id: req.params.id } })
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
