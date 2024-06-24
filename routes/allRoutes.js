import express from 'express'
import UserRoutes from './user.js'
import ContactsRoutes from './contacts.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.use('/users', UserRoutes)
router.use('/contacts', authMiddleware, ContactsRoutes)

export default router
