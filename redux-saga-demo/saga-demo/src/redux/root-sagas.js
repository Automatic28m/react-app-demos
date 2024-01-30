import { all, fork } from "redux-saga/effects";
import { watchGetUser } from "../saga/userSaga";

export default function* rootSaga() {
    yield all([
        fork(watchGetUser),
    ])
}