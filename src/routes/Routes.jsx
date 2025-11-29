import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts/AuthLayouts";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Forgot from "../pages/Auth/Forgot/Forgot";
import Service from "../pages/Service/Service";
import Coverage from "../pages/Coverage/Coverage";
import About from "../pages/About/About";
import Pricing from "../pages/Pricing/Pricing";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";
import Profile from "../pages/Profile/Profile";
import SendParcel from "../pages/SendParcel/SendParcel";

import PrivetRoute from "../pages/Shared/PrivetRoute/PrivetRoute";
import Rider from "../pages/Rider/Rider";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import AccountSettings from "../pages/AccountSettings/AccountSettings";
import AccountSetting from "../Layouts/AccountSetting/AccountSetting";
import AccountProfile from "../pages/AccountSettings/AccountPage/AccountProfile/AccountProfile";
import AccountAddress from "../pages/AccountSettings/AccountPage/AccountAddress/AccountAddress";
import AccountPayment from "../pages/AccountSettings/AccountPage/AccountPayment/AccountPayment";
import AccountDanger from "../pages/AccountSettings/AccountPage/AccountDanger/AccountDanger";

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
      { path: "/profile", Component: Profile },
      { path: "/send-parcel", Component: SendParcel },
      {
        path: "/be-a-rider",
        element: (
          <PrivetRoute>
            <Rider />
          </PrivetRoute>
        ),
      },
      {
        path: "/account-settings",
        element: (
          <PrivetRoute>
            <AccountSettings />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/account-setting",
    element: (
      <PrivetRoute>
        <AccountSetting />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: AccountProfile,
      },
      {
        path: "account-address",
        Component: AccountAddress,
      },
      {
        path: "account-payment",
        Component: AccountPayment,
      },
      {
        path: "account-danger",
        Component: AccountDanger,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot", Component: Forgot },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
    ],
  },
]);

export default Routes;
