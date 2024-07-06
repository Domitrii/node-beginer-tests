import express from 'express'
import UserControllers from '../controllers/users.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, UserControllers.register)
router.post('/login', jsonParser, UserControllers.login)
router.get('/logout', authMiddleware , UserControllers.logout)

export default router