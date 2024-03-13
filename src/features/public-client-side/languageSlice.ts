import { createSlice } from '@reduxjs/toolkit'


const languageSlice = createSlice({
    name: 'language',
    initialState: { script: 'Qq', isLatin: true },
    reducers: {
        switchLanguage: (state) => {
            state.script = state.script === 'Qq' ? 'Ққ' : 'Qq'
            state.isLatin = state.script === 'Qq'
        },
    }
})


export const { switchLanguage } = languageSlice.actions

export default languageSlice.reducer

export const selectCurrentLanguage = (state) => state.language.script
export const selectIsLatin = (state) => state.language.isLatin