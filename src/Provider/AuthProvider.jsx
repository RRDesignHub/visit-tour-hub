import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
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

  // forgot password/reset password
  const passwordReset = (email) =>{
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
  }


  // user signout:
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);

      //  get jwt token from server
        const {data} = await axios.post(`${import.meta.env.VITE_SERVER_API}/jwt`, {email: currentUser?.email})
        if(data?.token){
          localStorage.setItem("access-token", data?.token)
          setLoading(false);
        }
      } else {
        setUser(currentUser);
        localStorage.removeItem('access-token')
        setLoading(false);
      }
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
    passwordReset
  };
  return (
    <AuthContext.Provider value={authInformation}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
