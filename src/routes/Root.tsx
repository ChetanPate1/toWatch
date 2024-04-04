// Third Party
import { Outlet, useNavigate } from "react-router-dom";
// Local
import TwNavigationBar from "../components/TwNavigationBar";
import { useEffect } from "react";
import { useAppSelector } from "../app/store";

const Root = () => {
   const navigate = useNavigate();
   const { token } = useAppSelector((state) => state.storage);

   useEffect(() => {
      if (token) {
         navigate('/watching');
      }
   }, []);

   return (
      <div>
         <TwNavigationBar />
         <Outlet />
      </div>
   );
};

export default Root;