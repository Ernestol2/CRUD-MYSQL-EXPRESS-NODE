import express from "express";
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api', indexRoutes)
app.use('/api', employeesRoutes)

// Not Found Endpoint
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not found.'
    })
})

export default app;