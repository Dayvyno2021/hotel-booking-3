import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {type:String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: false},
  seller:{type: Boolean, required: true, default: false},
  stripe_account_id: '',
  stripe_seller: {
     id: '',
     object: '',
     charges_enabled: {type: Boolean, default: false},
     country: '',
     details_submitted: {type: Boolean, default: true},
     default_currency:'',
     balance: {type: Number, default: 0}
  },
  stripeSession: {}
}, {
  timestamps: true, strict: false
}
)

userSchema.pre('save', async function(next) {
 if (!this.isModified('password')){
   next()
  }
  this.password = await bcrypt.hashSync(this.password, 9);
});

userSchema.methods.checkpassword =  async function(enteredpassword) {
  return await bcrypt.compareSync(enteredpassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User

