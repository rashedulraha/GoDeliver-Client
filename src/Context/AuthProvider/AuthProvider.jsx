import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //! Registration User
  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return registerUser;
    } catch (error) {
      console.log(error.message);
    }
  };
  //! Signin user
  const signinUser = async (email, password) => {
    setLoading(true);
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  //! Logout User
  const logoutUser = () => {
    return signOut(auth);
  };

  //! forgot account
  // const

  //!  with google login
  const withGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //! update user Profile
  const updateUserProfile = (photo) => {
    return updateProfile(auth.currentUser, photo);
  };
  // ! update user  email
  const updateUserEmail = (email) => {
    const user = auth.currentUser;
    return updateEmail(user, email);
  };

  //! on auth observe state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //! delete user  account
  const deleteAccount = () => {
    const auth = auth.currentUser;
    return deleteUser(auth);
  };

  const authInfo = {
    registerUser,
    signinUser,
    withGoogleLogin,
    logoutUser,
    loading,
    user,
    updateUserProfile,
    deleteAccount,
    updateUserEmail,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
