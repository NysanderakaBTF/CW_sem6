import { configureStore } from '@reduxjs/toolkit'
import {userReducer} from "./slices/userStore.js";


export const store =  configureStore({
    reducer: {user:userReducer.reducer}
})