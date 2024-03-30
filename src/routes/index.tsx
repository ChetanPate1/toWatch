import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Components from "../pages/Components";
import Login from "../pages/Login";
import MostPopular from "../pages/MostPopular";
import Movies from "../pages/Movies";
import Watched from "../pages/Watched";
import Watching from "../pages/Watching";
import WatchingDetail from "../pages/WatchingDetail";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/components",
        element: <Components />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/most-popular",
        element: <MostPopular />,
      },
      {
        path: "/movie-collection",
        element: <Movies />,
      },
      {
        path: "/watched-shows",
        element: <Watched />,
      },
      {
        path: "/watching",
        element: <Watching />,
      },
      {
        path: "/watching/:id",
        element: <WatchingDetail />,
      },
      {
        path: "*",
        element: <Login />,
      }
    ],
  },
]);

export default router;
