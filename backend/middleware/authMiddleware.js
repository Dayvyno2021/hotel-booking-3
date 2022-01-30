import jwt from 'jsonwebtoken'
import colors from 'colors'
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

const protect= async(req, res, next)=>{
  try {
    
    const authorization = req.headers.authorization
    
    if (authorization && authorization.startsWith('Bearer')){
      const token = authorization.split(" ")[1]
      const decoded =await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password')
  
      next()
    }else{
      res.status(400).json("Wrong Authorization")
    }

  } catch (error) {
    res.status(400).json({
      message: "Not Authorized",
      systemMessage: error
    })
  }
}

const admin = async(req, res, next)=>{
  try {
    if (req.user && req.user.isAdmin===true){
      next()
    }else{
      res.status(400).json("Not authorized as an admin")
    }
  } catch (error) {
    res.status(400).json("Not authorized as an admin")
  }

}

export {protect, admin}