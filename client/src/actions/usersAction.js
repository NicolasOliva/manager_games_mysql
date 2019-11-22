import {
    DOWNLOAD_USERS,
    DOWNLOAD_USERS_SUCCESS,
    DOWNLOAD_USERS_ERROR
}from '../types';

import clientAxios from '../config/axios';


//GET USERS 

export function getUsers() {
    return (dispach) => {
        dispach(downloadUsers());
        clientAxios.get('/users')
            .then(res => {
                dispach(downloadUsersSuccess(res.data.users))
            })
            .catch(err => {
                dispach(downloadUsersError())
            })
    }
}

export const downloadUsers = () => ({
    type: DOWNLOAD_USERS
});

export const downloadUsersSuccess = users => ({
    type: DOWNLOAD_USERS_SUCCESS,
    payload: users
});

export const downloadUsersError = () => ({
    type: DOWNLOAD_USERS_ERROR
});