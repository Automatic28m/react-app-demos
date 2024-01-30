import { configureStore } from "@reduxjs/toolkit";
import langReducer from './slice/langSlice';

export const store = configureStore({
    reducer: {
        Language: langReducer,
    },
})