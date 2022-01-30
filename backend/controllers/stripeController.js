import User from "../models/userModel.js"
import Hotel from '../models/hotelModel.js'
import Order from "../models/orderModel.js"

// We used here for Orders too


//@ desc: POST find user
//@ route: GET /api/create-connect-account
//@ access: private

const createConnectAccount = async(req, res) =>{
  try {
    const user = await User.findById(req.user._id).select('-password')

    if (!user.stripe_account_id){
      const accountId = Math.floor(Math.random() * (10000000000 - 1)) + 1;
      user.stripe_account_id = `${user.name.substring(0, 3)}-${accountId}`
      await user.save();
      res.json({
        email: user.email,
        _id: user._id
      })

    } else if (user){
      res.json({
        email: user.email,
        _id: user._id
      })
    }
    else{
      res.status(400).json({message: "This stripe thing don still fail again"})
    }

  } catch (error) {
    res.status(400).json({
      message: "Unathorized user",
      systemMessage: error
    })
  }
}


//@ desc: POST find Update Account Status
//@ route: POST '/api/get-account-status'
//@ access: private

const getAccountStatus = async(req, res)=>{

  try {
    
    const userUpdate = await User.findById(req.user._id).select("-password")
    if (userUpdate){
      userUpdate.stripe_seller = {
        id : userUpdate.stripe_account_id,
        object : "account",
        charges_enabled: true,
        country: req.user.country,
        details_submitted: true,
        default_currency: "NGN"
      }
      await userUpdate.save()

      res.json(userUpdate)

    } else{
      res.status(400).json({
        message: "Payment was not accepted"
      })
    }

  } catch (error) {
    res.status(400).json({
      message: "Server down, could not make payment",
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }  
    
}

//@ desc: POST update Account Balance
//@ route: POST '/api/get-account-balance'
//@ access: private

const getAccountBalance = async(req, res)=>{   
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (user && user.stripe_seller){
      res.json(user.stripe_seller.balance)
    } else res.json(99999)
  } catch (error) {
    res.status(400).json({
      message: "Could not find user account balance",
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}


//@ desc: POST to get Session id and details
//@ route: POST '/api/stripe-session
//@ access: private

export const  stripeSession = async(req, res)=>{   
  try {
    const {hotelId} = req.body

    const sessionHotel = await Hotel.findById(hotelId).populate('postedBy')

    // const sessionId = Math.floor(Math.random() * (5E15 - 1)) + 1;

    const sessionUser = await User.findById(req.user._id)

    if (sessionUser && sessionUser._id)  {
      //Check the sessionId, I think we should avoid a second creation
      sessionUser.stripeSession = {
        sessionId : `Sess-@${Math.floor(Math.random() * (5E15 - 1)) + 1}`,
        amount_subtotal: sessionHotel.price,
        amount_total: sessionHotel.price,
        name: sessionHotel.title,
        payment_status: "unpaid"

      }
      await sessionUser.save()
      res.json({
        sessionId: sessionUser.stripeSession.sessionId,
        price: sessionUser.stripeSession.amount_total,
        name: sessionUser.stripeSession.name
      })
    } else{
      res.status(400).json({message: "Could not update session"})
    }

  } catch (error) {
    res.status(400).json({
      message: "Could not create session",
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}

//@ desc: GET To credit Seller for Buyers fake
//@ route: GET /api/stripe-session-payment/:hotelId
//@ access: private

export const updateSellersAccount = async(req, res) =>{
  try {
    const {hotelId} = req.params
    const hotel = await Hotel.findById(hotelId).populate('postedBy')
    if (hotel && hotel.postedBy && hotel.postedBy._id){
      // console.log("Hotel Poster")
      const ownerP = hotel.price*0.2
      const hotelOwner = await User.findById(hotel.postedBy._id).select('-password')
      if (hotelOwner && hotelOwner.stripe_seller){
        // console.log("Hotel Owner")
        hotelOwner.stripe_seller.balance = hotelOwner.stripe_seller.balance + ownerP

        await hotelOwner.save()
        res.json("Successfuly paid")
      } else{
        res.status(400).json({message: "Could not find hotel owner"})
      }
    }else{
      res.status(400).json({message: "Could not find hotel poster"})
    }
    
  } catch (error) {
    res.status(400).json({
      message: "Could not create session",
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}


//@ desc: POST update after a successful payment from stripe
//@ route: POST /api/stripe-success-payment/:hotelId
//@ access: private

export const stripeSuccessPayment = async(req, res) =>{
  try {
    const {hotelId} = req.params
    const user = await User.findById(req.user._id)
    const theHotel = await Hotel.findById(hotelId)
    // if (!user && !user.stripeSession){
    //   return
    // }
    if (theHotel && theHotel.postedBy && user && user.stripeSession && user.stripeSession.payment_status==="unpaid"){
      user.stripeSession.payment_status = "paid"
      console.log(`FIRST STRIPE>>: ${user.stripeSession.payment_status}`)
      await user.save()
      if (user && user.stripeSession && user.stripeSession.payment_status==="paid"){
        console.log(`SECOND STRIPE>>: ${user.stripeSession.payment_status}`)
        const orderExist = await Order.findOne({"session._id": user.stripeSession.sessionId})
        if (orderExist){
          res.json({success: true})
        } else{
          const newOrder = await new Order({
            hotel: hotelId,
            session: {
              sessionId : user.stripeSession.sessionId,
              amount_subtotal: user.stripeSession.amount_subtotal,
              amount_total: user.stripeSession.amount_total,
              name: user.stripeSession.name,
              payment_status: user.stripeSession.payment_status
            },
            orderedBy: user._id,
            postedBy: theHotel.postedBy
          })
          await newOrder.save()
          await User.findByIdAndUpdate(user._id, {$set: {stripeSession:{}}})
          res.json({success: true})
        }
      } else{
        res.status(400).json({message: "Stripe session error"})
      }
    }

  } catch (error) {
    res.status(400).json({
      message: "Could not create order:" ,
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}


//@ desc: GET to find the bookings of a user
//@ route: GET /api/user-hotel-bookings
//@ access: private

export const userhotelBookings = async(req, res) =>{
  try {
    const userBookings = await Order.find({orderedBy: req.user._id})
    .populate('hotel', '-image.data')
    .populate('orderedBy', '_id name')

    if (userBookings){
      res.json(userBookings)
    } else{
      res.status(400).json({message: "Could not find user bookings"})
    }

  } catch (error) {
    res.status(400).json({
      message: "Could not find the user bookings" ,
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}


//@ desc: GET checked if the user has already booked the hotel
//@ route: GET /api/is-already-booked/:hotelId
//@ access: private

export const alreadyBooked = async(req, res) =>{
  try {
    const allHotel = await Order.find({orderedBy: req.user._id}).select('hotel')
    if (allHotel ){
      const ids = allHotel.map(eachHotel=>{return eachHotel.hotel.toString()})
      res.json({
        status: ids.includes(req.params.hotelId)
      })     
    } else{
      res.status(400).json({message: "Could not find hotel"})
    }
  } catch (error) {
    res.status(400).json({
      message: "Server down, can not tell if hotel is booked" ,
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}



export {createConnectAccount, getAccountStatus, getAccountBalance}