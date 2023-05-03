import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth , storage ,db } from "../firebaseConfg";
import {  ref ,getDownloadURL ,uploadBytesResumable } from "firebase/storage";
import { doc, setDoc} from "firebase/firestore"; 
import { Timestamp } from 'firebase/firestore';



// sing up or singin method my google 
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

// function to create random id for post request
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  
  return randomString;
}

 //SendPost

 export const SendPost = createAsyncThunk('users/sendpost' , async(payload , {rejectWithValue})=>{
    const {image ,video ,user , description ,timestamp} = payload ;
        const id = generateRandomString();
  try{
    if(image){
        const imagesRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(imagesRef, image);
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      const docref = doc(db , 'articles' , id);
       await setDoc(docref , {
          actor: {
              description: user.email,
              title: user.displayName,
              date: timestamp,
              image: user.photo,
            },
            comments: 0,
            video: video,
            description: description,
            shareImg: downloadURL,
    });
    const date = timestamp.toDate().toISOString();
    const article = {
      actor: {
        description: user.email,
        title: user.displayName,
        date: date,
        image: user.photo,
      },
      comments: 0,
      video: video,
      description: description,
      shareImg: downloadURL,
    }
    return article
  }
);
        
     
              
        })
       
    }
    
    else {
        const docref = doc(db , 'articles' , id);
         await setDoc(docref , {
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
        const date = timestamp.toDate().toISOString();
        const article = {
        actor :  {
          description: user.email,
          title: user.displayName,
          date: date,
          image: user.photo,
        } ,
        comments: 0,
        video: video,
        description: description,
        shareImg:image ,
  }
        return article
        };
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
      articles : [],
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
     
      state.articles.push(action.payload);
        console.log(action.payload)
        console.log(state.articles)
        
      });
      builder.addCase(SendPost.pending, (state, action) => {

      });
      builder.addCase(SendPost.rejected, (state, action) => {
        alert(action.payload);
      });
  },
});
export default UserSlice.reducer;
