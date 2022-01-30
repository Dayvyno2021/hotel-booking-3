import {combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { allHotelsReducer, deleteHotelReducer, editHotelReducer, newHotelReducer, sellerHotelsReducer, singleHotelReducer } from "./reducers/hotelReducers";
import { alreadyBookedReducer, buyerPaymentReducer, getSessionReducer, paymentSuccessReducer, userOrderReducer } from "./reducers/sessionReducers";
import { 
  accountBalanceReducer, 
  accountStatusReducer, 
  countryEntityReducer, 
  stripeAccountReducer, 
  stripePersonalReducer 
} from "./reducers/stripeReducers";
import { userRegisterReducer, userLoginReducer, protectedLoginReducer,  } from "./reducers/userReducer";



const reducer = combineReducers({
  userRegisterReducer: userRegisterReducer,
  userLoginReducer: userLoginReducer,
  protectedLoginReducer: protectedLoginReducer,
  stripeAccountReducer: stripeAccountReducer,
  countryEntityReducer: countryEntityReducer,
  stripePersonalReducer: stripePersonalReducer,
  accountStatusReducer: accountStatusReducer,
  accountBalanceReducer: accountBalanceReducer,
  newHotelReducer: newHotelReducer,
  allHotelsReducer: allHotelsReducer,
  sellerHotelsReducer: sellerHotelsReducer,
  deleteHotelReducer: deleteHotelReducer,
  singleHotelReducer: singleHotelReducer,
  editHotelReducer: editHotelReducer,
  getSessionReducer: getSessionReducer,
  buyerPaymentReducer: buyerPaymentReducer,
  paymentSuccessReducer: paymentSuccessReducer,
  userOrderReducer: userOrderReducer,
  alreadyBookedReducer: alreadyBookedReducer

})

const userInfoStorage = localStorage.getItem('hotelUserInfo')?
  JSON.parse(localStorage.getItem('hotelUserInfo')) : null

const userAccountDetails = localStorage.getItem('userAccountDetails')? 
  JSON.parse(localStorage.getItem('userAccountDetails')): ''

const stripeInfo = localStorage.getItem("stripeInfo")?
  JSON.parse(localStorage.getItem("stripeInfo")) : {}

const countryEntity = localStorage.getItem("countryEntity")?
  JSON.parse(localStorage.getItem("countryEntity")) : {}

const personalDetails = localStorage.getItem("personalDetails")?
  JSON.parse(localStorage.getItem("personalDetails")) : {}

const accountStatus = localStorage.getItem("accountStatus")?
  JSON.parse(localStorage.getItem("accountStatus")) : {}

const initialReducer = {
  userRegisterReducer:  {user: userInfoStorage},
  userLoginReducer:  {user: userInfoStorage},
  stripeAccountReducer: {
    userAccount: userAccountDetails,
    stripeInfo: stripeInfo,
    countryEntity: countryEntity,
    personalDetails: personalDetails
  },
  accountStatusReducer: {updatedUser: accountStatus}

}
const middleware = [thunkMiddleware]

const store = createStore(
  reducer, 
  initialReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store