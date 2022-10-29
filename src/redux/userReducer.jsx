import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userDetails: null
    },
    reducers:{
        getUser:(state, action)=>{
            state.userDetails = action.payload;
        },
        resetUser:(state)=>{
            state.userDetails = null;
        }
    }
});

export const { getUser, resetUser } = userSlice.actions;

export default userSlice.reducer