import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.ts'
import languageReducer from './features/public-client-side/languageSlice.ts'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        language: languageReducer,
    }
})

