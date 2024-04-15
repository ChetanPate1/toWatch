import { createHashRouter } from "react-router-dom";

import Root from "./Root";
import Components from "../pages/Components";
import Login from "../pages/Login";
import MostPopular from "../pages/MostPopular";
import Movies from "../pages/Movies";
import MovieDetail from "../pages/MovieDetail";
import Watched from "../pages/Watched";
import Watching from "../pages/Watching";
import WatchingDetail from "../pages/WatchingDetail";
import ErrorPage from "../pages/ErrorPage";

const router = createHashRouter([
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
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/watched-shows",
        element: <Watched />,
      },
      {
        path: "/watching/:id?",
        element: <Watching />,
      },
      {
        path: "*",
        element: <Login />,

      }
    ],
  },
]);

export default router;
