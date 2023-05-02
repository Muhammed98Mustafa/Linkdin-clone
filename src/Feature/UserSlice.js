import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth , storage ,db } from "../firebaseConfg";
import {  ref ,getDownloadURL ,uploadBytesResumable } from "firebase/storage";
import { collection, addDoc} from "firebase/firestore"; 

export const singinWithGoogle = createAsyncThunk(
  "users/singinWithGoogle",
  async (payload, { rejectWithValue }) => {
    const googleAuth = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, googleAuth);
      const serializedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
        // Add any other necessary user properties
      };
      return serializedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

 export const SendPost = createAsyncThunk('users/sendpost' , async(payload , {rejectWithValue})=>{
    const {image ,video ,user , description ,timestamp} = payload ;
        console.log(payload)
  try{
    if(image){
        const imagesRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(imagesRef, image);
        const imageurl = await getDownloadURL(uploadTask.snapshot.ref).then((download) => {
            return download;
          });
        const docref = collection(db , 'articles');
        const article = await addDoc(docref , {
            actor: {
                description: user.email,
                title: user.displayName,
                date: timestamp,
                image: user.photo,
              },
              comments: 0,
              video: video,
              description: description,
              shareImg: imageurl,
        })
        console.log(article);
    }
    
    else {
        const docref = collection(db , 'articles');
        const article = await addDoc(docref , {
            actor: {
                description: user.email,
                title: user.displayName,
                date: timestamp,
                image: user.photo,
              },
              comments: 0,
              video: video,
              description: description,
              shareImg:image ,
        })
        console.log(article);
    }
}
catch(e){
   rejectWithValue(e.code)
}
})

export const Singoutuser = createAsyncThunk(
  "users/singoutuser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    userLogin: false,
    singedup: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singinWithGoogle.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.singedup = true;
      state.userLogin = true;
    });

    builder.addCase(singinWithGoogle.rejected, (state, action) => {
      alert(action.payload);
    });
    builder.addCase(Singoutuser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = null;
      state.singedup = false;
      state.userLogin = false;
    });
    builder.addCase(Singoutuser.rejected, (state, action) => {
      alert(action.payload);
    });
    builder.addCase(SendPost.fulfilled, (state, action) => {
        console.log(action.payload);
        
      });
      builder.addCase(SendPost.pending, (state, action) => {
        alert(action.payload);
      });
      builder.addCase(SendPost.rejected, (state, action) => {
        alert(action.payload);
      });
  },
});
export default UserSlice.reducer;
