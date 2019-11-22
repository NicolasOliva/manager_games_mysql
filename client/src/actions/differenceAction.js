import { DOWNLOAD_DIFFERENCE,
         DOWNLOAD_DIFFERENCE_SUCCESS,
         DOWNLOAD_DIFFERENCE_ERROR 
} from '../types'; 

import clientAxios from '../config/axios';

// GET ONE DIFFERENCE
export const getDifference = (id, id_opponent) => {
    return dispatch => {
        dispatch(downloadDifference())
        clientAxios.get(`/users/${id}/difference/${id_opponent}`)
            .then(res => {
                dispatch(downloadDifferenceSuccess(res.data.difference[0]))
            })
            .catch(err => {
                dispatch(downloadDifferenceError())
            })
    }
}

export const downloadDifference = () => ({
    type: DOWNLOAD_DIFFERENCE
})

export const downloadDifferenceSuccess = differences => ({
    type: DOWNLOAD_DIFFERENCE_SUCCESS,
    payload: differences  
})

export const downloadDifferenceError = () => ({
    type: DOWNLOAD_DIFFERENCE_ERROR  
})