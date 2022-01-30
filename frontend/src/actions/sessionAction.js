import axios from "axios";
import { ALREADY_BOOKED_FAIL, ALREADY_BOOKED_REQUEST, ALREADY_BOOKED_SUCCESS, BUYER_PAYMENT_FAIL, BUYER_PAYMENT_REQUEST, BUYER_PAYMENT_SUCCESS, GET_SESSION_FAIL, GET_SESSION_REQUEST, GET_SESSION_SUCCESS, STRIPE_PAYMENT_FAIL, STRIPE_PAYMENT_REQUEST, STRIPE_PAYMENT_SUCCESS, USER_ORDERS_FAIL, USER_ORDERS_REQUEST, USER_ORDERS_SUCCESS } from "../constants/sessionConstants";

export const getSessionAction = (hotelId) => async(dispatch, getState) =>{
  try {
    dispatch({type: GET_SESSION_REQUEST})

    const {userLoginReducer:{user}} = getState()
    const token = user.token
  
    const config = {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  
    const {data} = await axios.post(`/api/stripe-session`, hotelId, config)
    dispatch({type: GET_SESSION_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: GET_SESSION_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.message
    })
  }
}

export const buyerPaymentAction = (hotel) => async(dispatch, getState) =>{
  try {
    dispatch({type: BUYER_PAYMENT_REQUEST})

    const {userLoginReducer:{user}} = getState()
    const token = user.token
  
    const config = {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  
    const {data} = await axios.get(`/api/stripe-session-payment/${hotel.id}`, config)
    dispatch({type: BUYER_PAYMENT_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: BUYER_PAYMENT_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.message
    })
  }
}


export const paymentSuccessAction = (hotelId) => async(dispatch, getState) =>{
  try {
    dispatch({type:  STRIPE_PAYMENT_REQUEST})

    const {userLoginReducer:{user}} = getState()
    const token = user.token
  
    const config = {
      headers:{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
      }
    }
  
    const {data} = await axios.post(`/api/stripe-success-payment/${hotelId}`, {}, config)
    dispatch({type:  STRIPE_PAYMENT_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type:  STRIPE_PAYMENT_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.message
    })
  }
}


export const userOrderAction = () => async(dispatch, getState) =>{
  try {
    dispatch({type:  USER_ORDERS_REQUEST})

    const {userLoginReducer:{user}} = getState()
    const token = user.token
  
    const config = {
      headers:{
        Authorization : `Bearer ${token}`
      }
    }
  
    const {data} = await axios.get(`/api/user-hotel-bookings`, config)
    dispatch({type:  USER_ORDERS_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type:  USER_ORDERS_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.message
    })
  }
}


export const alreadyBookedAction = (hotelId) => async(dispatch, getState) =>{
  try {
    dispatch({type:  ALREADY_BOOKED_REQUEST})

    const {userLoginReducer:{user}} = getState()
    const token = user.token
  
    const config = {
      headers:{
        Authorization : `Bearer ${token}`
      }
    }
  
    const {data} = await axios.get(`/api/is-already-booked/${hotelId}`, config)
    dispatch({type:  ALREADY_BOOKED_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type:  ALREADY_BOOKED_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message : error.message
    })
  }
}