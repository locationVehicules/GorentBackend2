import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SideNavBar } from "../components/SideNavBar";
import { useEffect, useState } from "react";

export const GarageManagerApp = () => {
  const sideBar = document.getElementById("sidebar");
  const [navigate, setNavigate] = useState();

  useEffect(() => {
    sideBar === null ? setNavigate(true) : setNavigate(false);
  }, [sideBar]);

   useEffect(() => {
     localStorage.setItem("garage_manager", JSON.stringify(1));
   }, []);
  
  return (
    <>
      <SideNavBar userType="garage_manager" userApp="GarageManager" />
      {navigate && <Navigate to="GarageManager/Check-in-out" replace={true} />}
      <Outlet />
    </>
  );
};
