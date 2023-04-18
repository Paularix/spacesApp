// Librerias que se necesitan en el proyecto
import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import morgan from 'morgan'

// dotenv.config()  sirve para poder usar las variables de entorno en el archivo .env  
dotenv.config()

// Montar la app
const app = express()

// Middleware para poder procesar los datos JSON, evitar los errores de CORS, y tener información sobre las requests en terminal.
app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${tokens['response-time'](req, res)} ms`;
}))

// Primer endpoint para verificar que el servidor esta levantado.
app.get("/", (req, res) => {
    res.send("Hello, this is SpacesApp Server!")
})


//Montando la app en el servidor (utilizando la variable de entorno, "process.env")
const port = process.env.PORT
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})
