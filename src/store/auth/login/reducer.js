import { LOGIN_USER, LOGIN_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, API_ERROR, CHANGE_PASSWORD } from './actionTypes';
// import { updateSyncWarnings } from 'redux-form';

const initialState = {
    error: "",
    loading: false,
    user: JSON.parse(localStorage.getItem("userInfo"))
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            state = {
                ...state,
                loading: true
            }
            break;
        case LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload,
                loading: false
            }
            break;
        case CHANGE_PASSWORD:
            state = {
                ...state,
                changePassword: action.payload
            }
            break;
        case LOGOUT_USER:
            state = { ...state, user: null };
            break;
        case LOGOUT_USER_SUCCESS:
            state = { ...state };
            break;
        case API_ERROR:
            state = { ...state, error: action.payload, loading: false };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default login;