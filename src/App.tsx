// Core
import { useEffect } from "react";
// Third party
import { RouterProvider } from "react-router-dom";
// Local
import router from "./routes";
import { useAppDispatch, useAppSelector } from "../src/app/store";
import { storageInitilize } from "../src/app/features/storageSlice";
import { appReady } from "./app/features/appSlice";

const App = () => {
   const dispatch = useAppDispatch();
   const { ready } = useAppSelector((state) => state.app);

   useEffect(() => {
      (async () => {
         await dispatch(storageInitilize());
         dispatch(appReady());
      })();
   }, []);

   if (ready) {
      return (
         <RouterProvider router={router} />
      );
   }

   return null;
};

export default App;