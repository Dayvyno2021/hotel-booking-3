import mongoose from 'mongoose'

const hotelSchema = mongoose.Schema({
  postedBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  title: {type: String, required: true},
  content: {type: String, required: true, maxlength: 10000},
  location: {type: String, required: true},
  image: {data: Buffer, ContentType: String},
  price: {type: Number, required: true, trim:true},
  from: {type: Date},
  to: {type: Date},
  bed: {type: Number}
},
{timestamps: true}
)

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel