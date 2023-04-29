import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {   GoogleAuthProvider , signInWithPopup  } from "firebase/auth"; 
import {auth} from "../firebaseConfg"


export const singinWithGoogle =createAsyncThunk("users/singinWithGoogle" , async( payload ,{rejectWithValue }) => {
    
    const googleAuth = new GoogleAuthProvider();
    try {
        const { user } = await signInWithPopup(auth, googleAuth);
        const serializedUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photo :user.photoURL
            // Add any other necessary user properties
          };
        return serializedUser ;
    }
    catch(error){
            return rejectWithValue(error.message);
    }
})


const UserSlice = createSlice({
    name:"users" ,
    initialState : {
        user: null ,
        userLogin: false ,
        singedup : false ,
        error: null ,
    },
    reducers: {
        
    
    } , 
    extraReducers:(builder)=>{
    builder.addCase(singinWithGoogle.fulfilled ,(state , action )=>{
        console.log(action.payload)
        state.user = action.payload ;
        state.singedup = true ;
    })
    builder.addCase(singinWithGoogle.pending ,(state , action )=>{

    })
    builder.addCase(singinWithGoogle.rejected ,(state , action )=>{
        alert(action.payload)
    })

    }

})
export default UserSlice.reducer ;
