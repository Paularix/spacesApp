import express from "express"
import {sequelize} from "../loadSequelize.js"

const router = express.Router()

// GET users
// @desc obtener todos los usuarios de BD
router.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'GET all users'
    })
})

// GET user
// @desc obtener un usuario por su id
router.get('/:id', (req, res) => {
    const idUser = req.params.id
    res.json({
        ok: true,
        message: `GET user ${idUser}`
    })
})

// DELETE user
// @desc borrar un usuario por su id
router.delete('/:id', (req, res) => {
    const idUser = req.params.id
    res.json({
        ok: true,
        message: `DELETE user ${idUser}`
    })
})

// POST user
// @desc borrar un usuario por su id
router.post('/', (req, res) => {
    const user = req.body.user
    res.json({
        ok: true,
        user: user
    })
})

// PUT user
// @desc actualizar un usuario por su id
router.delete('/:id', (req, res) => {
    const idUser = req.params.id
    res.json({
        ok: true,
        message: `PUT user ${idUser}`
    })
})


export default router