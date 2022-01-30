import express from 'express'
const router = express.Router()
import { login, registerUser, profile } from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/profile').get(protect, profile)

export default router