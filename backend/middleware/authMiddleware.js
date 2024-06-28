// *  Imported Libraries or Frameworks
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

//* Imported Model File
import User from '../models/userModel.js'

//? ============== Protect Middleware ================================
const protect = asyncHandler(async (req, res, next) => {
  let token
  // To access the token  => console.log(req.headers.authorization)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // ?  Getting the user id
      //   console.log(decoded)
      //   *put rest of the user's data (except password) in req.user, which now have access to in all our protected routes
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error(' Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, No token ')
  }
})

//? ====================== Admin Middleware   ===============================================
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
