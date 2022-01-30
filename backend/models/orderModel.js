import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
  session: {
     sessionId:'',
     amount_subtotal: '',
     amount_total: '',
     name: '',
     payment_status: ''
  },
  orderedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  postedBy: {type:mongoose.Schema.Types.ObjectId, ref: 'User'}
  
}, {timestamps: true, strict: false})

const Order = mongoose.model('Order', orderSchema)

export default Order