import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: {
        username: '',
        email: '',
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData.username = action.payload.username
            state.userData.email = action.payload.email
        }
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer