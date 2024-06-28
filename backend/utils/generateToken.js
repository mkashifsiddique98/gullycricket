//*  Imported Libraries or Frameworks
import jwt from 'jsonwebtoken'

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1300d',
  })
}

export default generateToken
