import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import Routes from "./routes/Routes";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Routes} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
