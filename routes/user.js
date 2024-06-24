import express from 'express'
import UserControllers from '../controllers/users.js'

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, UserControllers.register)
router.post('/login', jsonParser, UserControllers.login)

export default router