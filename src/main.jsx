import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import Routes from "./routes/Routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>
);
