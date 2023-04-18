import express from 'express';
import multer from 'multer';
import {sequelize} from "../loadSequelize.js";
import {Services} from '../models/Models.js';


const router = express.Router();

// GET services
// @desc obtener todos los services de BD
router.get('/', function (req, res, next) {

    sequelize.sync().then(() => {

        Services.findAll()
            .then(services => res.json({
                ok: true,
                data: services
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

// GET de un solo services
router.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Services.findOne({ where: { id: req.params.id } })
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
