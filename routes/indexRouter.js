import express from "express"

const router = express.Router()

// Primer endpoint para verificar que el servidor esta levantado.
router.get('/', (req, res) => {
    res.send('Hello, this is SpacesApp Server!')
})


export default router