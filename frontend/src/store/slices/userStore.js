import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:{},
    token:""
}

export const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) =>{
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        }
    }
})