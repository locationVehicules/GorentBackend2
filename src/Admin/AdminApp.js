import { Outlet, Navigate } from "react-router-dom";
import { SideNavBar } from "../components/SideNavBar";
import { useEffect, useState } from "react";

export const AdminApp = () => {
  const sideBar = document.getElementById("sidebar");
  const [navigate, setNavigate] = useState();

  useEffect(() => {
    sideBar === null ? setNavigate(true) : setNavigate(false);
  }, [sideBar]);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(1));
  }, []);

  return (
    <>
      <SideNavBar userType="admin" userApp="Admin" />
      {navigate && <Navigate to="Admin/User-management" replace={true} />}
      <Outlet />
    </>
  );
};
