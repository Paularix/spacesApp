import express from 'express';
import multer from 'multer';
import {sequelize} from "../loadSequelize.js";
import {Services} from '../models/Models.js';
import { authenticate, authError } from './middleware.js';



const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photos-profile')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage, debug: true }).single('file');

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

// GET services
// @desc obtener todos los services de BD
router.get('/auth', [authenticate, authError], function (req, res, next) {

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
