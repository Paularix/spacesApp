// Librerias que se necesitan en el proyecto
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import indexRouter from './routes/indexRouter.js'
import spacesRouter from './routes/spacesRouter.js'
import usersRouter from './routes/usersRouter.js'
import bookingsRouter from './routes/bookingsRouter.js'
import datesRouter from './routes/datesRouter.js'
import preferencesRouter from './routes/preferencesRouter.js'
import servicesRouter from './routes/servicesRouter.js'

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// dotenv.config()  sirve para poder usar las variables de entorno en el archivo .env  
dotenv.config()

// Montar la app
const app = express()

// Middleware para poder procesar los datos JSON, evitar los errores de CORS, y tener información sobre las requests en terminal.
app.use(express.json())
app.use(cors())

const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
    app.use(morgan((tokens, req, res) => {
        return `${req.method} ${req.url} ${res.statusCode} - ${tokens['response-time'](req, res)} ms`;
    }))
}

app.use(express.static("photos-profile"))

// Routers
app.use('/api', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/spaces', spacesRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/dates', datesRouter)
app.use('/api/preferences', preferencesRouter)
app.use('/api/services', servicesRouter)

app.use('/api/photos/users', express.static('photos-profile'));
app.use('/api/photos/spaces', express.static('photos-spaces'));

//deployment...
app.use(express.static("./frontSpaces/dist"));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  'frontSpaces', 'dist', 'index.html'));
});



// Montando la app en el servidor (utilizando la variable de entorno, "process.env")
// const port = process.env.PORT
const port = 3080
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})
