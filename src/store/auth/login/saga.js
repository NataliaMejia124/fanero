import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, LOGIN_SUCCESS } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError } from './actions';

//Include Both Helper File with needed methods
import { getFirebaseBackend } from '../../../helpers/firebase_helper';
import { ApiConstants } from '../../../common/apiConstants';

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: user }) {
    localStorage.setItem(ApiConstants.LS_USER, JSON.stringify(user));
}

function* logoutUser({ payload: { history } }) {
    try {
         localStorage.removeItem("authUser");

         if(process.env.REACT_APP_DEFAULTAUTH === 'firebase')
         {
           const response = yield call(fireBaseBackend.logout);
           yield put(logoutUserSuccess(response));
         }
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_SUCCESS, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default authSaga;