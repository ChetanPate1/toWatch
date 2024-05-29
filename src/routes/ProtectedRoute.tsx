// Core
import React from "react";
// Third Party
import { Navigate } from "react-router-dom";
// Local
import { useAppSelector } from "@/app/store";

type Props = {
   children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
   const { token } = useAppSelector((state) => state.storage);
   console.log({ token });

   if (!token) {
      // user is not authenticated
      return <Navigate to="/login" />;
   }
   return children;
};

export default ProtectedRoute;