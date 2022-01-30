import axios from "axios"
import { 
  ALL_HOTELS_FAIL, 
  ALL_HOTELS_REQUEST, 
  ALL_HOTELS_SUCCESS, 
  DELETE_HOTEL_FAIL, 
  DELETE_HOTEL_REQUEST, 
  DELETE_HOTEL_SUCCESS, 
  NEW_HOTEL_FAIL, 
  NEW_HOTEL_REQUEST, 
  NEW_HOTEL_SUCCESS, 
  SELLER_HOTELS_FAIL, 
  SELLER_HOTELS_REQUEST, 
  SELLER_HOTELS_SUCCESS,
  SINGLE_HOTEL_REQUEST,
  SINGLE_HOTEL_SUCCESS,
  SINGLE_HOTEL_FAIL,
  EDIT_HOTEL_REQUEST,
  EDIT_HOTEL_SUCCESS,
  EDIT_HOTEL_FAIL
} from "../constants/hotelConstants"

// Action 1
export const newHotelAction = (hotelDetails)=> async(dispatch, getState) =>{
  try {
    dispatch({type:NEW_HOTEL_REQUEST})

    const {userLoginReducer: {user}} = getState()
    const token = user.token

    const config = {
      headers: {
        "Content-Type" : "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.post('/api/create-hotel', hotelDetails, config)

    dispatch({
      type: NEW_HOTEL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NEW_HOTEL_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message: error.message
    })
  }
}

// Action 2
export const allHotelsAction = (name='', activePage='', bed='', date='') => async(dispatch) =>{
  try {
    dispatch({type: ALL_HOTELS_REQUEST})

    const config = {
      headers:{
        "Content-Type": "application/json"
      }
    }

    const {data} = 
      await axios.get(`/api/hotels/?name=${name}&activePage=${activePage}&bed=${bed}&date=${date}` , config)

    dispatch({type: ALL_HOTELS_SUCCESS, payload: data}) //

  } catch (error) {
    dispatch({
      type: ALL_HOTELS_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}


// ACtion 3
export const sellerHotelsAction = ()=> async(dispatch, getState) =>{
  try {
    dispatch({type:SELLER_HOTELS_REQUEST})

    const {userLoginReducer: {user}} = getState()
    const token = user.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.get('/api/seller-hotels', config)

    dispatch({type: SELLER_HOTELS_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: SELLER_HOTELS_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message: error.message
    })
  }
}


// 4.

export const deleteHotelAction = (id)=> async(dispatch, getState) =>{
  try {
    dispatch({type:DELETE_HOTEL_REQUEST})

    const {userLoginReducer: {user}} = getState()
    const token = user.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.delete(`/api/hotel/delete/${id}`, config)

    dispatch({
      type: DELETE_HOTEL_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: DELETE_HOTEL_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message: error.message
    })
  }
}

// 5. 

export const singleHotelAction = (id) => async(dispatch) =>{
  try {
    dispatch({type: SINGLE_HOTEL_REQUEST})

    const {data} = await axios.get(`/api/hotel/${id}`)

    dispatch({type: SINGLE_HOTEL_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: SINGLE_HOTEL_FAIL,
      payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    })
  }
}

// 6. 

export const editHotelAction = (id, editDetails)=> async(dispatch, getState) =>{
  try {
    dispatch({type:EDIT_HOTEL_REQUEST})

    const {userLoginReducer: {user}} = getState()
    const token = user.token

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.put(`/api/edit/hotel/${id}`, editDetails, config)

    dispatch({type: EDIT_HOTEL_SUCCESS, payload: data})

  } catch (error) {
    dispatch({
      type: EDIT_HOTEL_FAIL,
      payload: error.response && error.response.data.message?
        error.response.data.message: error.message
    })
  }
}
