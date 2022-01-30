import { 
  NEW_HOTEL_FAIL, 
  NEW_HOTEL_REQUEST, 
  NEW_HOTEL_SUCCESS,
  NEW_HOTEL_RESET,
  ALL_HOTELS_REQUEST,
  ALL_HOTELS_SUCCESS,
  ALL_HOTELS_FAIL,
  SELLER_HOTELS_REQUEST,
  SELLER_HOTELS_SUCCESS,
  SELLER_HOTELS_FAIL,
  DELETE_HOTEL_REQUEST,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_FAIL,
  SINGLE_HOTEL_REQUEST,
  SINGLE_HOTEL_SUCCESS,
  SINGLE_HOTEL_FAIL,
  EDIT_HOTEL_REQUEST,
  EDIT_HOTEL_SUCCESS,
  EDIT_HOTEL_FAIL,
  EDIT_HOTEL_RESET
 } from "../constants/hotelConstants"

export const newHotelReducer = (state={}, action) => {
  switch (action.type) {
    case NEW_HOTEL_REQUEST:
      return {...state, loading: true}
    
    case NEW_HOTEL_SUCCESS:
      return {...state, loading: false, hotel: action.payload}

    case NEW_HOTEL_FAIL:
      return {...state, loading:false, error: action.payload}

    case NEW_HOTEL_RESET:
      return {}
  
    default:
      return state
  }
}

export const allHotelsReducer = (state={hotels:[]}, action) => {
  switch (action.type) {
    case ALL_HOTELS_REQUEST:
      return {...state, loading: true, hotels:[]}
    
    case ALL_HOTELS_SUCCESS:
      return {...state, loading: false, hotels: action.payload.hotels, pages: action.payload.pages, active: action.payload.active}

    case ALL_HOTELS_FAIL:
      return {...state, loading:false, error: action.payload}
  
    default:
      return state
  }
}

export const sellerHotelsReducer = (state={sellerHotels:[]}, action) => {
  switch (action.type) {
    case SELLER_HOTELS_REQUEST:
      return {...state, loading: true, sellerHotels: []}
    
    case SELLER_HOTELS_SUCCESS:
      return {...state, loading: false, sellerHotels: action.payload}

    case SELLER_HOTELS_FAIL:
      return {...state, loading:false, error: action.payload}
  
    default:
      return state
  }
}


export const deleteHotelReducer = (state={}, action) => {
  switch (action.type) {
    case DELETE_HOTEL_REQUEST:
      return {...state, loading: true}
    
    case DELETE_HOTEL_SUCCESS:
      return {...state, loading: false, success: true}

    case DELETE_HOTEL_FAIL:
      return {...state, loading:false, error: action.payload}
  
    default:
      return state
  }
}


export const singleHotelReducer = (state={anHotel:{postedBy:{}}}, action) => {
  switch (action.type) {
    case SINGLE_HOTEL_REQUEST:
      return {...state, loading: true}
    
    case SINGLE_HOTEL_SUCCESS:
      return {...state, loading: false, anHotel: action.payload, success: true}

    case SINGLE_HOTEL_FAIL:
      return {...state, loading:false, error: action.payload}
  
    default:
      return state
  }
}


export const editHotelReducer = (state={}, action) => {
  switch (action.type) {
    case EDIT_HOTEL_REQUEST:
      return {...state, loading: true}
    
    case EDIT_HOTEL_SUCCESS:
      return {...state, loading: false, edittedHotel: action.payload, success: true}

    case EDIT_HOTEL_FAIL:
      return {...state, loading:false, error: action.payload}
    
    case EDIT_HOTEL_RESET:
      return {}
  
    default:
      return state
  }
}