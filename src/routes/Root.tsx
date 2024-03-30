// Third Party
import { Outlet } from "react-router-dom";
// Local
import TwNavigationBar from "../components/TwNavigationBar";

const Root = () => {
   return (
      <div>
         <TwNavigationBar />
         <Outlet />
      </div>
   );
};

export default Root;