import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, storage, db } from "../firebaseConfg";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc , getDocs , collection  } from "firebase/firestore";

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
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

//SendPost

export const SendPost = createAsyncThunk(
  "users/sendpost",
  async (payload, { rejectWithValue }) => {
    const { image, video, user, description, timestamp } = payload;
    const id = generateRandomString();

    try {
      if (image) {
        const imagesRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(imagesRef, image);
          // in this function you should check and dont return the value of article until the image process done 
        // Wrap the upload and document update logic in a Promise
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            async(snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");

              // Check if upload is complete (progress is 100%)
              if (progress === 100) {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                const docref = doc(db, "articles", id);
                await setDoc(docref, {
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
                const date = timestamp;
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
                };
                resolve(article);
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              console.error("Error during upload:", error);
              reject(error);
            }
          );
        });
      } else {
        const docref = doc(db, "articles", id);
        await setDoc(docref, {
          actor: {
            description: user.email,
            title: user.displayName,
            date: timestamp,
            image: user.photo,
          },
          comments: 0,
          video: video,
          description: description,
          shareImg: image,
        });
        const date = timestamp;
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
          shareImg: image,
        };
        return article;
      }
    } catch (e) {
      console.error("Error:", e);
      rejectWithValue(e.code);
    }
  }
);

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

/// bring post 

export const fetchdata = createAsyncThunk(
  "users/readdata",
  async (_payload, { rejectWithValue }) => {
    const doref = collection(db, "articles");
    try {
      const data = await getDocs(doref);
      const sortedData = data.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const dateA = a.actor.date;
          const dateB = b.actor.date;
          return dateB - dateA;
        });
        
      return sortedData;
    } catch (error) {
      return rejectWithValue(error.message);
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
    articles: [],
    loadingposts : true ,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(singinWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.singedup = true;
      state.userLogin = true;
    });

    builder.addCase(singinWithGoogle.rejected, (state, action) => {
      alert(action.payload);
    });
    builder.addCase(Singoutuser.fulfilled, (state, action) => {
      state.user = null;
      state.singedup = false;
      state.userLogin = false;
    });
    builder.addCase(Singoutuser.rejected, (state, action) => {
      alert(action.payload);
    });
      builder.addCase(SendPost.fulfilled, (state, action) => {
        state.articles.unshift(action.payload);
   
      });
    builder.addCase(SendPost.pending, (state, action) => {});
    builder.addCase(SendPost.rejected, (state, action) => {
      alert(action.payload);
    });
      builder.addCase(fetchdata.fulfilled, (state, action) => {
        console.log(action.payload);
          state.articles = action.payload  
          state.loadingposts = false ;
      });
    builder.addCase(fetchdata.pending, (state, action) => 
    {
        state.loadingposts = true ;
    });
    builder.addCase(fetchdata.rejected, (state, action) => {
      alert(action.payload);
    });
  },
});
export default UserSlice.reducer;
