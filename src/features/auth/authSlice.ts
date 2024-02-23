import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredential: (state, action) => {
            state.token = action.payload
        },
        logOut: (state) => {
            state.token = null
        }
    }
})


export const {
    setCredential,
    logOut
} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token