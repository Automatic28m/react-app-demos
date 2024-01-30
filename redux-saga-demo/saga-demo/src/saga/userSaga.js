import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { getUserSuccessAction, getUserErrorAction, getUserAction } from "../redux/slice/userSlice";
import axios from 'axios';

const doGetUser = createAction('GET_USER_BY_ID');

//Watcher
export function* watchGetUser() {
    yield takeLatest(doGetUser, getUserSaga);
};

//Worker
function* getUserSaga(action) {
    try {
        const id = action.payload;
        yield put(getUserAction());
        const response = yield axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log(response.data)
        yield put(getUserSuccessAction(response.data));
    } catch (error) {
        yield put(getUserErrorAction(error));
    }
};

export {
    doGetUser
}