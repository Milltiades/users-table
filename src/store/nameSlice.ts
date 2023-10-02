import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
    name: "name",
    initialState: {
        value:"giga"
    },
    reducers: {
        updateName: (state, action) => {
            state.value = action.payload

        },
        clearName: (state) => {
            state.value = ''
        }
    }
})


export const { updateName, clearName} = nameSlice.actions;

export default  nameSlice.reducer;