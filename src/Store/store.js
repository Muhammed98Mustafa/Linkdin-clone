import { configureStore } from "@reduxjs/toolkit";
import users  from "../Feature/UserSlice" ;

export const store = configureStore({
    reducer : {
        users : users 
    }
})
