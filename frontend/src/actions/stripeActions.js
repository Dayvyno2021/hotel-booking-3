import axios from 'axios'
import { 
  ACCOUNT_BALANCE_FAIL,
  ACCOUNT_BALANCE_REQUEST,
  ACCOUNT_BALANCE_SUCCESS,
  ACCOUNT_STATUS_FAIL,
  ACCOUNT_STATUS_REQUEST,
  ACCOUNT_STATUS_SUCCESS,
  CONTINUE_STRIPE_DETAILS,
  COUNTRY_ENTITY,
  CREATE_CONNECT_ACCOUNT_FAIL, 
  CREATE_CONNECT_ACCOUNT_REQUEST, 
  CREATE_CONNECT_ACCOUNT_SUCCESS, 
  PAYOUT_SETTING_REQUEST, 
  STRIPE_PERSONAL_DETAILS} from "../constants/stripeConstants"
import { USER_PROFILE_SUCCESS } from '../constants/userConstants'


  
  export const stripeAccountAction = () => async(dispatch, getState)=>{
    try {
      dispatch({type: CREATE_CONNECT_ACCOUNT_REQUEST})

      const {userLoginReducer: {user}} = getState()
      
    const config = {
      headers: {
        "Content-Type":"application/json",
        authorization: `Bearer ${user.token}`
      }
    }
  
    const {data} = await axios.post(`/api/create-connect-account`, {}, config)
    
    dispatch({
      type: CREATE_CONNECT_ACCOUNT_SUCCESS,
      payload: data
    })
    
    localStorage.setItem('userAccountDetails', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CREATE_CONNECT_ACCOUNT_FAIL,
      payload: error.response.data.message && error.response ?
        error.response.data.message : error.message
      })
    }
  }


  export const continueStripeAction = (userDetails) => async(dispatch) => {
    
    dispatch({
      type: CONTINUE_STRIPE_DETAILS,
      payload: userDetails
    })
    localStorage.setItem("stripeInfo", JSON.stringify(userDetails))
  }


  export const countryEntityAction = (countryEntity) => async(dispatch) =>{
    dispatch({
      type: COUNTRY_ENTITY,
      payload: countryEntity
    })

    localStorage.setItem("countryEntity", JSON.stringify(countryEntity))
  }

  
  export const stripePersonalAction = (personalDetails) => async(dispatch) =>{
    dispatch({
      type: STRIPE_PERSONAL_DETAILS,
      payload: personalDetails
    })

    localStorage.setItem("personalDetails", JSON.stringify(personalDetails))
  }



  export const accountStatusAction = (paymentUpdate) => async(dispatch, getState) =>{
    try {
      dispatch({type:ACCOUNT_STATUS_REQUEST})

      const {userLoginReducer:{user}} = getState()
      const token = user.token

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        }
  
      }

      const {data} = await axios.post(`/api/get-account-status`, paymentUpdate, config)
      dispatch({
        type: ACCOUNT_STATUS_SUCCESS,
        payload: data
      })
      
      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data
      // })
      dispatch({type: USER_PROFILE_SUCCESS, payload: data})

      localStorage.setItem("accountStatus", JSON.stringify(data))

    } catch (error) {
      dispatch({
        type: ACCOUNT_STATUS_FAIL,
        payload: error.response.data.message && error.response ?
          error.response.data.message : error.message
      })
    }
  }


  export const accountBalanceAction = () => async(dispatch, getState) =>{
    try {
      dispatch({type:ACCOUNT_BALANCE_REQUEST})

      const {userLoginReducer:{user}} = getState()
      const token = user.token

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        }
  
      }

      const {data} = await axios.post(`/api/get-account-balance`, {}, config)
      dispatch({
        type: ACCOUNT_BALANCE_SUCCESS,
        payload: data
      })


    } catch (error) {
      dispatch({
        type: ACCOUNT_BALANCE_FAIL,
        payload: error.response.data.message && error.response ?
          error.response.data.message : error.message
      })
    }
  }


  export const payOutSettingAction = () => async(dispatch, getState) =>{
    try {
      dispatch({type:PAYOUT_SETTING_REQUEST})

      const {userLoginReducer:{user}} = getState()
      const token = user.token

      const config = {
        headers: {
          Authorization : `Bearer ${token}`
        }
  
      }

      const {data} = await axios.get(`/api/payout-setting`, config)
      dispatch({
        type: PAYOUT_SETTING_REQUEST,
        payload: data
      })


    } catch (error) {
      dispatch({
        type: PAYOUT_SETTING_REQUEST,
        payload: error.response.data.message && error.response ?
          error.response.data.message : error.message
      })
    }
  }

