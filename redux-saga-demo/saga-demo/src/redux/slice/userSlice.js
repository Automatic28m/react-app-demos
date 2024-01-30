import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        data: null,
        isLoading: false,
        errors: '',
    }
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUserAction: (state) => {
            state.user.isLoading = true;
            state.user.errors = '';
        },

        getUserSuccessAction: (state, action) => {
            const user = action.payload;
            state.user.isLoading = false;
            state.user.data = user;
        },

        getUserErrorAction: (state, action) => {
            const error = action.payload;
            state.user.isLoading = false;
            state.user.errors = error;
        },
    },
})

const { actions, reducer } = userSlice
export const {
    getUserSuccessAction,
    getUserAction,
    getUserErrorAction,
} = actions
export default reducer;