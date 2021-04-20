import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR, CHANGE_PASSWORD } from './actionTypes';

export const loginUser = (user, history) => {
    return {
        type: LOGIN_USER,
        payload: { user, history }
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const changePassword = (payload) => {
    return {
        type: CHANGE_PASSWORD,
        payload: payload
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: {}
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {}
    }
}

export const apiError = (error) => {
    return {
        type: API_ERROR,
        payload: error
    }
}
