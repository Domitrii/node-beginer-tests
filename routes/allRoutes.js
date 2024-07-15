import express from 'express'
import UserRoutes from './user.js'
import WaterRoutes from './water.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.use('/users', UserRoutes)
router.use('/track', authMiddleware, WaterRoutes)

export default router
