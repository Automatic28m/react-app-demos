import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        data: null,
        isLoading: false,
        errors: '',
    },
    storedName: [],
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
            state.user.data = null;
        },
        addUserToStore: (state, action) => {
            state.storedName.push(action.payload);
        },
        deleteUserFromStore: (state, action) => {
            state.storedName.splice(action.payload, 1);
        }
    },
})

const { actions, reducer } = userSlice
export const {
    getUserSuccessAction,
    getUserAction,
    getUserErrorAction,
    addUserToStore,
    deleteUserFromStore,
} = actions
export default reducer;