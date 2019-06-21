 //import {GET_ERRORS} from '../actions/types';
 import {SET_CURRENT_USER, LOGOUT_USER,DELETE} from '../actions/types';

const initialState = {
    isAuthenticated:false,
    user:{}
}

export default function(state = initialState,action){
    switch(action.type){
       // case TEST_DISPATCH:
         //   return{
         //       ...state,
         //       user: action.payload
         //   }
         case SET_CURRENT_USER:
         return{
             ...state,
             isAuthenticated: true,//!isEmpty(action.payload),
             user: action.payload
         };
         case DELETE:
         return{
             ...state,
             isAuthenticated:false,
             user:action.payload
         }
         case LOGOUT_USER:
         return{
             ...state,
             isAuthenticated:false,
             user:{}
         };
        default:
            return state;
    }    
}


 