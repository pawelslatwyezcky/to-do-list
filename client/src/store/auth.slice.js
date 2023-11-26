import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: null,
        loading: false,
        error: null,
    },
    reducers: {
        auth: (state, action) => {
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action?.payload })
            )
            state.authData = action?.payload
            state.loading = false
        },
        loading: (state) => {
            state.loading = true
        },
        logout: (state) => {
            localStorage.clear()
            state.authData = null
            state.loading = false
        },
        authError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        closeError: (state) => {
            state.error = null
        },
    },
})

export const { auth, logout, loading, authError, closeError } =
    authSlice.actions

export default authSlice.reducer
