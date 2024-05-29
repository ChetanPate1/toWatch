// Core
import { useEffect } from "react";
// Third Party
import { Outlet, useNavigate } from "react-router-dom";
// Local
import { Toaster } from "@/components/ui/toaster";
import TwNavigationBar from "@/components/TwNavigationBar";

import { useAppSelector } from "@/app/store";

const Root = () => {
   const navigate = useNavigate();
   const { token } = useAppSelector((state) => state.storage);

   // useEffect(() => {
   //    if (token) {
   //       navigate('/watching');
   //    }
   // }, []);

   return (
      <div>
         <TwNavigationBar />
         <Outlet />
         <Toaster />
      </div>
   );
};

export default Root;