
import axios from 'axios'
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET
} from '../constants/userConstants'

export const userRegisterAction = (user) => async(dispatch) =>{
  try {
    dispatch({type: USER_REGISTER_REQUEST})

    const config = {
      headers: {"Content-Type": "application/json"}
    }

    const {data} = await axios.post('/api/user/register', user, config)

    dispatch({type: USER_REGISTER_SUCCESS, payload: data})
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    
    localStorage.setItem('hotelUserInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message && error.response ? 
      error.response.data.message : error.message
    })
  }
}

export const logout = () =>async(dispatch)=>{
  localStorage.removeItem('hotelUserInfo')
  localStorage.removeItem('userAccountDetails')
  localStorage.removeItem('stripeInfo')
  localStorage.removeItem('countryEntity')
  localStorage.removeItem('personalDetails')
  localStorage.removeItem('accountStatus')

  document.location.href='/'
  dispatch({type:USER_LOGOUT})
  dispatch({type: USER_PROFILE_RESET})
}

export const userLoginAction = (loginInfo) => async(dispatch)=>{
  try {
    dispatch({type: USER_LOGIN_REQUEST})

    const config = {
      headers: {"Content-Type" : "application/json"}
    }
  
    const {data} = await axios.post('/api/user/login', loginInfo, config)
  
    dispatch({type: USER_REGISTER_SUCCESS, payload: data})
    dispatch({type: USER_LOGIN_SUCCESS, payload: data})
  
    localStorage.setItem('hotelUserInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL, 
      payload: error.response && error.response.data.message? 
        error.response.data.message : error.message
    })
  }

}

export const protectedLoginAction = () => async(dispatch, getState)=>{
  try {
    dispatch({type: USER_PROFILE_REQUEST})


    const {userRegisterReducer: {user}} = getState()
    const token = user.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const {data} = await axios.get('/api/user/profile', config)
  
    dispatch({type: USER_PROFILE_SUCCESS, payload: data})
  
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL, 
      payload: error.response && error.response.data.message? 
        error.response.data.message : error.message
    })
  }

}
