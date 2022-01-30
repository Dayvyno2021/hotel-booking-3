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
  STRIPE_PERSONAL_DETAILS
} from "../constants/stripeConstants";


export const stripeAccountReducer = (state={}, action) =>{
  switch (action.type) {
    case CREATE_CONNECT_ACCOUNT_REQUEST:
      return {...state, loading: true}
    
    case CREATE_CONNECT_ACCOUNT_SUCCESS:
      return {...state, loading: false, userAccount: action.payload}

    case CREATE_CONNECT_ACCOUNT_FAIL:
      return {...state, loading: false, error: action.payload}

    case CONTINUE_STRIPE_DETAILS:
      return {...state, stripeInfo:action.payload}
  
    default:
      return state
  }
}

export const countryEntityReducer = (state={}, action) =>{
  switch (action.type) {
    case COUNTRY_ENTITY:
      return {...state, countryDetails: action.payload};
  
    default:
      return state;
  }
}

export const stripePersonalReducer = (state={}, action) =>{
  switch (action.type) {
    case STRIPE_PERSONAL_DETAILS:
      return {...state, personalDetails: action.payload}
  
    default:
      return state
  }
}

export const accountStatusReducer = (state={}, action)=>{
  switch (action.type) {
    case ACCOUNT_STATUS_REQUEST:
      return {...state, loading: true}
    
    case ACCOUNT_STATUS_SUCCESS:
      return {...state, loading: false, updatedUser: action.payload}

    case ACCOUNT_STATUS_FAIL:
      return {...state, loading: false, error: action.payload}
  
    default:
      return state
  }
}

export const accountBalanceReducer = (state={}, action)=>{
  switch (action.type) {
    case ACCOUNT_BALANCE_REQUEST:
      return {...state, loading: true}
    
    case ACCOUNT_BALANCE_SUCCESS:
      return {...state, loading: false, balance: action.payload}

    case ACCOUNT_BALANCE_FAIL:
      return {...state, loading: false, error: action.payload}
  
    default:
      return state
  }
}