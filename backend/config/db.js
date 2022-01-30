import mongoose from "mongoose";
import colors from 'colors'
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async() =>{

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    
    if (conn){
      console.log(`Your MONGO-DB database is now connected, host: ${conn.connection.host}`.blue.inverse)
    }
  } catch (error) {
    console.error(`Database could not be connected, error :${error}`.red.inverse)
    process.exit(1)
  }
}

export default connectDB