import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS ,CLEAR_CURRENT_PROFILE,DELETE, GET_PROFILES} from './types';




//gets current user profile
export const getCurrentProfile = () =>dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        ).catch(err => 
            dispatch({
                type:GET_PROFILE,
                payload:{}
            }) 
        );
};

//create profile
export const createProfile =(profiledata,history) =>dispatch =>{
    axios.post('/api/profile',profiledata)
        .then(res => history.push('/dashboard'))
        .catch(err =>{
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        });
};

//add experience
export const addExperience =(expdata,history) =>dispatch =>{
    axios.post('/api/profile/experience',expdata)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}

//add education
export const addEducation =(edudata,history) =>dispatch =>{
    axios.post('/api/profile/education',edudata)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data
    }))
}

//delete experience from the id
export const DeleteExperience =(id) =>dispatch =>{
    axios.delete(`/api/profile/experience/${id}`)
    .then(res =>
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    );
}

//delete education from the id
export const DeleteEducation =(id) =>dispatch =>{
    axios.delete(`/api/profile/education/${id}`)
    .then(res =>
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    )
    .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
    );
}



//delete Account & profile
export const deleteAccount = () => dispatch =>{
    if (window.confirm('Are you sure?This can NOT be undone')){
        axios.delete('/api/profile')
            .then(res =>
                dispatch({
                    type: DELETE,
                    payload:{}
                })
            )
            .catch(err =>
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            );
    }
};

//get all profiles
export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all')
    .then(res =>dispatch({
        type:GET_PROFILES,
        payload:res.data  
        })
    )
    .catch(err =>
        dispatch({
            type:GET_PROFILES,
            payload:null
        })
        );
};


//get profile by handle
export const getprofileByHandle =(handle) =>dispatch =>{
    axios.get(`/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type:GET_PROFILE,
                payload:null
            })
            )
}



//profile loading
export const setProfileLoading = () =>{
    return{
        type:PROFILE_LOADING
    }
};


export const clearProfile = () =>{
    return{
        type:CLEAR_CURRENT_PROFILE,

    }
}







