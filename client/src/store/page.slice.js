import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        isSignIn: false,
        isSignUp: false,
        tab: 'DAY',
    },
    reducers: {
        closeModal: (state) => {
            state.isSignIn = false
            state.isSignUp = false
        },
        signInModal: (state) => {
            state.isSignIn = true
            state.isSignUp = false
        },
        signUpModal: (state) => {
            state.isSignIn = false
            state.isSignUp = true
        },
        setTab: (state, action) => {
            state.tab = action.payload
        },
    },
})

export const { closeModal, signInModal, signUpModal, setTab } =
    pageSlice.actions

export default pageSlice.reducer
