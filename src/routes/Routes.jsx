import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Forgot from "../pages/Auth/Forgot/Forgot";
import EmailVerify from "../pages/Auth/EmailVerify/EmailVerify";
import Service from "../pages/Service/Service";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About/About";
import Pricing from "../pages/Pricing/Pricing";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      { index: true, Component: Home },
      { path: "/service", Component: Service },
      { path: "/coverage", Component: Coverage },
      { path: "/about", Component: About },
      { path: "/pricing", Component: Pricing },
      { path: "/blog", Component: Blog },
      { path: "/contact", Component: Contact },
    ],
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
