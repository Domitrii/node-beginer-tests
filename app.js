import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import usersRouter from './routes/allRoutes.js'
import './db/db.js'
import dotenv from "dotenv";
import 'dotenv/config'

dotenv.config();

const app = express()

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

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