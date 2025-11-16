import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default Routes;
