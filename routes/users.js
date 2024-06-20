import express from 'express'
import UserControllers from '../controllers/users.js'



const router = express.Router();
const jsonParser = express.json();

router.get('/register', jsonParser , UserControllers.register)



export default router
