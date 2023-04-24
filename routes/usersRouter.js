import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { sequelize } from "../loadSequelize.js";
import { Users } from '../models/Models.js';
import {authenticate, authError} from './middleware.js';



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

// REGISTER user
//@desc register a user 
router.post("/register", (req, res, next) => {

    // if (req.body.password == req.body.repeatPassword) {
    //     const hash = bcrypt.hashSync(req.body.password, 10)
    //     req.body.password = hash

        Users.create({
            first_name: req.body.first_name,
            last_names: req.body.last_names,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password
        })
            .then(item => {
                res.json({
                    ok: true,
                    data: item
                })
            })
            .catch((error) => {
                res.json({
                    ok: false,
                    error
                })
            })
    //} 
    // else {
    //     res.status(400).json({
    //         ok: false,
    //         error: "Passwords do not match"
    //     })
    // }
})

// LOG IN a user
//@desc LOG IN with a user and set Token
router.post('/login', (req, res) => {
    const response = {};
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            ok: false, 
            msg: "email or password not received" 
        });
    }
    Users.findOne({ where: { email } })
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                throw "Correo electrónico o contraseña incorrectos.";
            }
        })
        .then(user => {            
            response.token = jsonwebtoken.sign(
                {
                    expiredAt: new Date().getTime() + Number(process.env.EXPIRED_AFTER),
                    email: user.email,
                },
                process.env.SECRET_KEY
            );
            response.ok = true;
            res.json(response);
        })
        .catch(err => res.status(400).json({ 
            ok: false, 
            error: err 
        }))
})

// GET protected
// @desc get info from a protected route
router.get("/auth/protected", [authenticate, authError], (req, res) => {
    res.status(200).json({
        ok: true,
        message: "Protected Route"
    })
})

export default router;
