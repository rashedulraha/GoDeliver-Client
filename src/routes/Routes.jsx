import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Forgot from "../pages/Auth/Forgot/Forgot";
import EmailVerify from "../pages/Auth/EmailVerify/EmailVerify";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot", Component: Forgot },
      { path: "email-verify", Component: EmailVerify },
    ],
  },
]);

export default Routes;
