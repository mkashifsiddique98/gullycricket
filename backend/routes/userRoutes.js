// * Importing to use express Router
import express from 'express'
const router = express.Router()
// * Imported Controller Files
import {
  authUser,
  changePassword,
  registerUser,
} from '../controllers/userController.js'

router.route('/register').post(registerUser)
router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/change-password', changePassword)



export default router
