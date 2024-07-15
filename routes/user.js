import express from 'express'
import UserControllers from '../controllers/auth.js'
import authMiddleware from '../middleware/auth.js'
import authRefresh from '../middleware/refreshAuth.js';

const router = express.Router();
const jsonParser = express.json();

router.post('/register', jsonParser, UserControllers.register)
router.post('/login', jsonParser, UserControllers.login)
router.post('/logout', authMiddleware , UserControllers.logout)
// router.post('/refresh', authRefresh, UserControllers.refresh )
// router.get('/updatePassword', authMiddleware, UserControllers.updatePassword)

export default router