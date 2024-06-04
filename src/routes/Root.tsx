// Third Party
import { Outlet } from "react-router-dom";
// Local
import { Toaster } from "@/components/ui/toaster";
import TwNavigationBar from "@/components/TwNavigationBar";

const Root = () => {
   return (
      <div className="bg-white dark:bg-neutral-950 pt-24 pb-10 h-full min-h-screen">
         <TwNavigationBar />
         <Outlet />
         <Toaster />
      </div>
   );
};

export default Root;