import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
import axios from "axios";
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user with email and password:
  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Save user data to the server immediately after Google login:
      await axios.post(`${import.meta.env.VITE_SERVER_API}/users/${user.email}`, {
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
      });
  
      // Update the local state:
      setUser(user);
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // update user's data:
  const updateUserProfile = async (name, photoURL) => {
    setLoading(true);
    const currentUser = auth.currentUser;
    try {
      if (currentUser) {
        await updateProfile(currentUser, { displayName: name, photoURL });
        setUser({
          ...currentUser,
          displayName: name,
          photoURL: photoURL,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // user signout:
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("User --->", currentUser);
      if (currentUser?.email) {
        setUser(currentUser);

       
        // const {data} = await axios.post(`${import.meta.env.VITE_API}/jwt`, {email: currentUser.email}, {withCredentials:true})
        // console.log(data)
      } else {
        setUser(currentUser);
        // const {data} = await axios.get(`${import.meta.env.VITE_API}/logoutJWT`, {withCredentials:true})
        // console.log(data)
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInformation = {
    loading,
    user,
    setUser,
    userSignUp,
    updateUserProfile,
    userLogin,
    userGoogleLogin,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInformation}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
