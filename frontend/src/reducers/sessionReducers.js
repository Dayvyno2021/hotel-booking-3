import { ALREADY_BOOKED_FAIL, ALREADY_BOOKED_REQUEST, ALREADY_BOOKED_SUCCESS, BUYER_PAYMENT_FAIL, BUYER_PAYMENT_REQUEST, BUYER_PAYMENT_RESET, BUYER_PAYMENT_SUCCESS, GET_SESSION_FAIL, GET_SESSION_REQUEST, GET_SESSION_SUCCESS, STRIPE_PAYMENT_FAIL, STRIPE_PAYMENT_REQUEST, STRIPE_PAYMENT_SUCCESS, USER_ORDERS_FAIL, USER_ORDERS_REQUEST, USER_ORDERS_SUCCESS } from "../constants/sessionConstants";

export const getSessionReducer = (state={}, action) => {
  switch (action.type) {
    case GET_SESSION_REQUEST:
      return {...state, loading:true}

    case GET_SESSION_SUCCESS:
      return {...state, loading: false, session: action.payload}

    case GET_SESSION_FAIL:
      return {...state, loading: false, error: action.payload}
  
    default:
      return state
  }
}


export const buyerPaymentReducer = (state={}, action) => {
  switch (action.type) {
    case BUYER_PAYMENT_REQUEST:
      return {...state, loading:true}

    case BUYER_PAYMENT_SUCCESS:
      return {...state, loading: false, session: action.payload, success: true}

    case BUYER_PAYMENT_FAIL:
      return {...state, loading: false, error: action.payload}

    case BUYER_PAYMENT_RESET:
      return {}
  
    default:
      return state
  }
}


export const paymentSuccessReducer = (state={}, action) => {
  switch (action.type) {
    case  STRIPE_PAYMENT_REQUEST:
      return {...state, loading:true}

    case  STRIPE_PAYMENT_SUCCESS:
      return {...state, loading: false, payment: action.payload, success: true}

    case  STRIPE_PAYMENT_FAIL:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}


export const userOrderReducer = (state={orders:[]}, action) => {
  switch (action.type) {
    case  USER_ORDERS_REQUEST:
      return {...state, loading:true}

    case  USER_ORDERS_SUCCESS:
      return {...state, loading: false, orders: action.payload}

    case  USER_ORDERS_FAIL:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}


export const alreadyBookedReducer = (state={}, action) => {
  switch (action.type) {
    case  ALREADY_BOOKED_REQUEST:
      return {...state, loading:true}

    case  ALREADY_BOOKED_SUCCESS:
      return {...state, loading: false, status: action.payload}

    case  ALREADY_BOOKED_FAIL:
      return {...state, loading: false, error: action.payload}

    default:
      return state
  }
}