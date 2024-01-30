import userReducer from "./slice/userSlice";
import { combineReducers } from '@reduxjs/toolkit';

const rootReducers = combineReducers({
    users: userReducer,
});

export default rootReducers;