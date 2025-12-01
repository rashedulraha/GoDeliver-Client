import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  //!  interceptors request

  useEffect(() => {
    const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    //!  interceptors response
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error.message);

        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logoutUser().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logoutUser, navigate, user.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
