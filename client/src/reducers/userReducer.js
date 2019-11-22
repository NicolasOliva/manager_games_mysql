import {
    DOWNLOAD_USERNAME,
    DOWNLOAD_USERNAME_SUCCESS,
    DOWNLOAD_USERNAME_ERROR,

    DOWNLOAD_USER_GAMES,
    DOWNLOAD_USER_GAMES_SUCCESS,
    DOWNLOAD_USER_GAMES_ERROR
}from '../types';

const initialState = {
    name: '',
    games: [],
    error: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case DOWNLOAD_USERNAME: 
            return {
                ...state,
                error: null
            }
        case DOWNLOAD_USERNAME_SUCCESS: 
        return {
            ...state,
            name: action.payload,
            error: false
        }
        case DOWNLOAD_USERNAME_ERROR: 
        return {
            ...state,
            error: true
        }
        case DOWNLOAD_USER_GAMES: 
        return {
            ...state,
            error: null
        }
        case DOWNLOAD_USER_GAMES_SUCCESS: 
        return {
            ...state,
            games: action.payload,
            error: false
        }
        case DOWNLOAD_USER_GAMES_ERROR: 
        return {
            ...state,
            error: true
        }
        default :
        return state
    }
}