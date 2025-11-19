import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../Firebase/Firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
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

  //  with google login
  const withGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //! on auth observe state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    registerUser,
    signinUser,
    withGoogleLogin,
    loading,
    user,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
