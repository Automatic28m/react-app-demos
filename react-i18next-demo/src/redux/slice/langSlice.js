import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: "th",
}

export const langSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload
        },
    },
})

// const { actions, reducer } = langSlice
// export const {
//     setLanguage
// } = actions
// export default reducer;

export const {setLanguage} = langSlice.actions;
export default langSlice.reducer