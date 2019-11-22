import {
    DOWNLOAD_TEAMS,
    DOWNLOAD_TEAMS_SUCCESS,
    DOWNLOAD_TEAMS_ERROR 
} from '../types';

import clientAxios from '../config/axios';

//ALL TEAMS
export const getTeams = () => {
    return dispatch => {
        dispatch(downloadTeams())
        clientAxios.get('/team')
            .then(res => {
                dispatch(downloadTeamsSuccess(res.data.teams))
            })
            .catch(err => {
                dispatch(downloadTeamsError())
            })
    }
}

export const downloadTeams = () => ({
    type: DOWNLOAD_TEAMS
})

export const downloadTeamsSuccess = teams => ({
    type: DOWNLOAD_TEAMS_SUCCESS,
    payload: teams  
})

export const downloadTeamsError = () => ({
    type: DOWNLOAD_TEAMS_ERROR  
})