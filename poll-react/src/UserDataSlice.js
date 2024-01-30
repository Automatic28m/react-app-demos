import { createSlice } from '@reduxjs/toolkit'

export const UserDataSlice = createSlice({
  name: 'UserData',
  initialState: {
    userId: "",
    username: ""
  },
  reducers: {
    setStoreUserData: (state, action) => {
      state.userId = action.payload.id;
      state.username = action.payload.username;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setStoreUserData } = UserDataSlice.actions

export default UserDataSlice.reducer