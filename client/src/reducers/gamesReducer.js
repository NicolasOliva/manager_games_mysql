import {
    DOWNLOAD_GAMES,
    DOWNLOAD_GAMES_SUCCESS,
    DOWNLOAD_GAMES_ERROR,

    CREATE_NEW_GAME,
    NEW_GAME_SUCCESS,
    NEW_GAME_ERROR
}from '../types';

const initialState = {
    games: [],
    error: null
}

export default function (state = initialState, action) {
    switch(action.type) {
        case DOWNLOAD_GAMES: 
            return {
                ...state,
                error: null
            }
        case DOWNLOAD_GAMES_SUCCESS: 
            return {
                ...state,
                games: action.payload,
                error: false
            }
        case DOWNLOAD_GAMES_ERROR: 
            return {
                ...state,
                games:[],
                error: true
            }
        
        case CREATE_NEW_GAME: 
            return {
                ...state,
                error: null
            }
        case NEW_GAME_SUCCESS: 
            return {
                games: [...state.games, action.payload],
                error: false
            }
        case NEW_GAME_ERROR: 
            return {
                ...state,
                games:[],
                error: true
            }

        default:
            return state
        }
}