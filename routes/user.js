import express from 'express';
import UserControllers from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';
import authRefresh from '../middleware/refreshAuth.js';
import CurrentUser from '../controllers/current.js';

const router = express.Router();

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);
router.post('/logout', authMiddleware, UserControllers.logout);
router.get('/current', authMiddleware, CurrentUser.currentUser)
router.post('/update', authMiddleware, CurrentUser.updateUser)
// router.post('/refresh', authRefresh, UserControllers.refresh )
// router.get('/updatePassword', authMiddleware, UserControllers.updatePassword)

export default router;
 
