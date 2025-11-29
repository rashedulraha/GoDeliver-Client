import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import Routes from "./routes/Routes";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = document.getElementById("root");

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes} />
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>
);
