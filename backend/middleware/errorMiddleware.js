const notFound = (req, res, next)=>{
  const error = new Error()
  res.status(404).json(`The URL entered ${req.originalUrl} cannot be Found`)
  next(error)
}


// const errorHandler = (err, req, res, next)=>{
//   const statusCode = req.statusCode === 200? 500: res.statusCode
//   res.status(statusCode)
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV==='production'? null : err.stack
//   })
// }

export {notFound}