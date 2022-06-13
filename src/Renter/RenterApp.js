import { Outlet, Navigate } from "react-router-dom";
import { SideNavBar } from "../components/SideNavBar";
import React, { useEffect, useState } from "react";

export const RenterApp = () => {
  const sideBar = document.getElementById("sidebar");
  const [navigate, setNavigate] = useState();

  useEffect(() => {
    sideBar === null ? setNavigate(true) : setNavigate(false);
  }, [sideBar]);
  useEffect(() => {
    localStorage.setItem("ndtype", JSON.stringify("garage_manager"));
    localStorage.setItem("myId", JSON.stringify(3));
    localStorage.setItem("driver", JSON.stringify(1));
    localStorage.setItem("business", JSON.stringify(0));
  }, []);

  return (
    <>
      <SideNavBar userType="renter private driver" userApp="Renter" />
      {navigate && <Navigate to="Renter/Rent" replace={true} />}
      <Outlet />
    </>
  );
};
