import {ADD_POST,GET_POSTS,GET_POST,POST_LOADING,DELETE_POST} from '../actions/types';

const initialState = {
    posts:[],
    post:{},
    isLoading:false
};

export default function(state=initialState,action){
    switch(action.type)
    {
        case ADD_POST:
            return {
                ...state,
                posts:[action.payload, ...state.posts]
            }
        case DELETE_POST:
            return{
                ...state,
                posts:state.posts.filter(post => post._id !== action.payload)   
            }
        case GET_POSTS:
            return{
                ...state,
                posts:action.payload,
                isLoading:false
            }
        case GET_POST:
        return{
            ...state,
            post:action.payload,
            isLoading:false
        }
        case POST_LOADING:
            return{
                ...state,
                isLoading:true
            }
        default:
            return state;
    }
}