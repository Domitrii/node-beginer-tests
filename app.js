import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import usersRouter from './routes/allRoutes.js'
import './db/db.js'
import dotenv from "dotenv";
import 'dotenv/config'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express()

app.use(morgan("tiny"));
app.use(cors({
    origin: 'https://frontend-water.vercel.app/'
}));
app.use(express.json());

const SwaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: '1.0.0',
            description: 'API Info',
            contact: {
                name: "Dima"
            }
        },
        servers: [
            {
                url: 'https://dimas-server.com',
                description: 'Production server'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const SwaggerDocs = swaggerJsDoc(SwaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs))

app.use('/api', usersRouter)

app.use((_, res) => {
    res.status(404).send({message: 'Route not found'})
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });

app.listen(7070, () => {
    console.log("Server is running on port 7070");
})