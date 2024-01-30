import { createSlice } from '@reduxjs/toolkit'

export const SigninSlice = createSlice({
  name: 'SigninSignup',
  initialState: {
    value: true,
  },
  reducers: {
    changeStatus: (state) => {
        state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeStatus } = SigninSlice.actions

export default SigninSlice.reducer