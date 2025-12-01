import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

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
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [user.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;
