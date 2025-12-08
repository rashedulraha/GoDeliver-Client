import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";''

import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import AOS
import AOS from "aos";

// Initialize AOS
AOS.init({
  // Global settings:
  disable: false,
  startEvent: "DOMContentLoaded",
  initClassName: "aos-init",
  animatedClassName: "aos-animate",
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,

  // Animation settings:
  offset: 100,
  delay: 0,
  duration: 800,
  easing: "ease-in-out",
  once: true, // Animation happens only once
  mirror: false,
  anchorPlacement: "top-bottom",
});

const root = document.getElementById("root");

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes} />
      </AuthProvider>
    </QueryClientProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </StrictMode>
);
