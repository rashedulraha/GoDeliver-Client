import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext/AuthContext";

const useAuth = () => {
  const AuthInfo = useContext(AuthContext);
  return AuthInfo;
};

export default useAuth;
