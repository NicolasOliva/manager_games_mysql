import {
    DOWNLOAD_USERS,
    DOWNLOAD_USERS_SUCCESS,
    DOWNLOAD_USERS_ERROR
}from '../types';

const initialState = {
    users : [],
    error: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case DOWNLOAD_USERS: 
            return {
                ...state,
                error: null
            }
        case DOWNLOAD_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                error: false
            }
        case DOWNLOAD_USERS_ERROR: 
            return {
                ...state,
                users: [],
                error: true
            }
        default: 
            return state;
    }
} 