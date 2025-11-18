import React from "react";
import AuthContext from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

const AuthProvider = ({ children }) => {
  //! Registration User
  const register = async (email, password) => {
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
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  const authInfo = {
    register,
    signinUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
