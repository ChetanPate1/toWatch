import { createHashRouter } from "react-router-dom";

import Root from "./Root";
import Components from "@/pages/Components";
import Login from "@/pages/Login";
import MostPopular from "@/pages/MostPopular";
import Movies from "@/pages/Movies";
import Watched from "@/pages/Watched";
import Watching from "@/pages/Watching";
import ErrorPage from "@/pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/watched-shows",
        element: (
          <ProtectedRoute>
            <Watched />
          </ProtectedRoute>
        ),
      },
      {
        path: "/watching/:id?",
        element: (
          <ProtectedRoute>
            <Watching />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Login />,
      }
    ],
  },
]);

export default router;
