import { all, fork } from "redux-saga/effects";
import { watchSaga } from "../saga/userSaga";

export default function* rootSaga() {
    yield all([
        fork(watchSaga),
    ])
}