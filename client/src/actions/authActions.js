//import {TEST_DISPATCH} from './types';
import { GET_ERRORS,SET_CURRENT_USER,LOGOUT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'




//register user
export const registerUser = (userdata,history) => dispatch =>{
  
  //  return {
  //      type: TEST_DISPATCH,
  //      payload: userdata
  //  };

    axios.post('api/user/register',userdata)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        })
    );
    
};




//login user
export const loginUser = (userdata) => dispatch =>{

  axios.post('api/user/login',userdata)
  .then(res =>{

    const { token } = res.data;

    localStorage.setItem('jwttoken', token);
    //set token to auth header
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));

  })
  .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );

};


//set logged info of user from token
export const setCurrentUser = decoded =>{
  return {
    type:SET_CURRENT_USER,
    payload:decoded
  }
};


export const logoutUser =() =>dispatch =>{

  localStorage.removeItem('jwttoken');

  setAuthToken(false);
  dispatch({
    type:LOGOUT_USER
  })
};