import {
    DOWNLOAD_TEAMS,
    DOWNLOAD_TEAMS_SUCCESS,
    DOWNLOAD_TEAMS_ERROR 
}from '../types';

const initialState = {
    teams: [],
    error: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case DOWNLOAD_TEAMS: 
            return {
                ...state,
                error: null
            }
        case DOWNLOAD_TEAMS_SUCCESS: 
            return {
                ...state,
                teams: action.payload,
                error: false
            }
        case DOWNLOAD_TEAMS_ERROR: 
            return {
                ...state,
                error: true
            }
        default :
            return state
    }
}