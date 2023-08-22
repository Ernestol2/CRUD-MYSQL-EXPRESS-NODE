import express from "express";
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'
import {dirname} from 'path'
import path, { fileURLToPath } from "url";


const app = express()

// Convert import.meta.url to a filesystem path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// EJS engine sets
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

// Set up static file serving for CSS and other assets
app.use(express.static(`${__dirname}/public`));

// Middleware
app.use(express.json())


// Routes
app.use(indexRoutes)
app.use('/api', employeesRoutes)

// Not Found Endpoint
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not found.'
    })
})

export default app;