import {
    DOWNLOAD_GAMES,
    DOWNLOAD_GAMES_SUCCESS,
    DOWNLOAD_GAMES_ERROR,

    CREATE_NEW_GAME,
    NEW_GAME_SUCCESS,
    NEW_GAME_ERROR
} from '../types';

import clientAxios from '../config/axios';

//ALL GAMES
export const getGames = () => {
    return dispatch => {
        dispatch(downloadGames())
        clientAxios.get('/games')
            .then(res => {
                dispatch(downloadGamesSuccess(res.data.games))
            })
            .catch(err => {
                dispatch(downloadGamesError())
            })
    }
}

export const downloadGames = () => ({
    type: DOWNLOAD_GAMES
})

export const downloadGamesSuccess = games => ({
    type: DOWNLOAD_GAMES_SUCCESS,
    payload: games  
})

export const downloadGamesError = () => ({
    type: DOWNLOAD_GAMES_ERROR  
})


// NEW GAME
export const newGame = (game) => {
    return dispatch => {
        dispatch(createGames())
        clientAxios.post('/games', game)
            .then(res => {
                dispatch(createGameSuccess(game))
            })
            .catch(err => {
                dispatch(createGameError())
            })
    }
}

export const createGames = () => ({
    type: CREATE_NEW_GAME
})

export const createGameSuccess = game => ({
    type: NEW_GAME_SUCCESS,
    payload: game  
})

export const createGameError = () => ({
    type: NEW_GAME_ERROR  
})