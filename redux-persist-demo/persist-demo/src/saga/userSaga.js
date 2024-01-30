import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { getUserSuccessAction, getUserErrorAction, getUserAction, addUserToStore, deleteUserFromStore } from "../redux/slice/userSlice";
import axios from 'axios';

const doGetUser = createAction('GET_USER_BY_ID');
const doAddUser = createAction('ADD_USER_TO_STORE');
const doDeleteUser = createAction('DELETE_USER_FROM_STORE');

//Watcher
export function* watchSaga() {
    yield takeLatest(doGetUser, getUserSaga);
    yield takeLatest(doAddUser, addUserSaga);
    yield takeLatest(doDeleteUser, deleteUserSaga);
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

function* addUserSaga(action) {
    yield put(addUserToStore(action.payload));
};

function* deleteUserSaga(action) {
    yield put(deleteUserFromStore(action.payload));
};

export {
    doGetUser,
    doAddUser,
    doDeleteUser,
}