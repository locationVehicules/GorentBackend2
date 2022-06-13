import React from "react";
import { Logo } from "./Logo";
import { Navitem } from "./navitem";
import "../css/global.css";

export const SideNavBar = ({ userType, userApp }) => {
  const defineUser = () => {
    let userNavItems = [];
    switch (userType) {
      case "admin":
        userNavItems = [
          {
            href: `${userApp}/User-management`,
            i_class: "bi bi-people fs-4",
            span_text: "User management",
          },
          {
            href: `${userApp}/Vehicles-management`,
            i_class: "bi bi-truck fs-4",
            span_text: "Vehicles management",
          },
          {
            href: `${userApp}/Tools-management`,
            i_class: "bi bi-wrench-adjustable-circle fs-4",
            span_text: "Tools management",
          },
          {
            href: `${userApp}/Questions-management`,
            i_class: "bi bi-question-square fs-4",
            span_text: "Questions management",
          },
          {
            href: `${userApp}/Agencies-Parkings`,
            i_class: "bi bi-building fs-4",
            span_text: "Agencyies and Parkings",
          },
        ];
        break;
      case "owner":
        userNavItems = [
          {
            href: `${userApp}/Black-list`,
            i_class: "bi bi-person-x fs-4",
            span_text: "Black list",
          },
          {
            href: `${userApp}/Reclamation-management`,
            i_class: "bi bi-question-square fs-4",
            span_text: "Reclamation management",
          },
          {
            href: `${userApp}/Change-prices`,
            i_class: "bi bi-currency-exchange fs-4",
            span_text: "Change vehicles prices",
          },
          {
            href: `${userApp}/Change-tools-prices`,
            i_class: "bi bi-currency-exchange fs-4",
            span_text: "Change tools prices",
          },
          {
            href: `${userApp}/Change-Salaries`,
            i_class: "bi bi-cash-coin fs-4",
            span_text: "Change salaries",
          },
          {
            href: `${userApp}/Status`,
            i_class: "bi bi-command fs-4",
            span_text: "Status",
          },
        ];
        break;
      case "secretary":
        userNavItems = [
          {
            href: `${userApp}/Rentals-management`,
            i_class: "bi bi-receipt-cutoff fs-4",
            span_text: "Rentals management",
          },
          {
            href: `${userApp}/User-management`,
            i_class: "bi bi-people fs-4",
            span_text: "User management",
          },
          {
            href: `${userApp}/Vehicles-management`,
            i_class: "bi bi-truck fs-4",
            span_text: "Vehicles management",
          },
          {
            href: `${userApp}/Tools-management`,
            i_class: "bi bi-wrench-adjustable-circle fs-4",
            span_text: "Tools management",
          },
        ];
        break;
      case "renter private":
        userNavItems = [
          {
            href: `${userApp}/Rent`,
            i_class: "bi bi-bicycle fs-4",
            span_text: "Rent",
          },
          {
            href: `${userApp}/Rentals`,
            i_class: "bi bi-receipt fs-4",
            span_text: "Rentals",
          },
          {
            href: `${userApp}/Contact-administrator`,
            i_class: "bi bi-envelope fs-4",
            span_text: "Contact administrator",
          },
          {
            href: `${userApp}/Settings`,
            i_class: "bi bi-gear fs-4",
            span_text: "Settings",
          },
          {
            href: "/",
            i_class: "bi bi-box-arrow-right fs-4",
            span_text: "Logout",
          },
        ];
        break;
      case "renter private driver":
        userNavItems = [
          {
            href: `${userApp}/Rent`,
            i_class: "bi bi-bicycle fs-4",
            span_text: "Rent",
          },
          {
            href: `${userApp}/Rentals`,
            i_class: "bi bi-receipt fs-4",
            span_text: "Rentals",
          },
          {
            href: `${userApp}/add-problem`,
            i_class: "bi bi-exclamation-circle fs-4",
            span_text: "Repport probelm",
          },
          {
            href: `${userApp}/Contact-administrator`,
            i_class: "bi bi-envelope fs-4",
            span_text: "Contact administrator",
          },
          {
            href: `${userApp}/Settings`,
            i_class: "bi bi-gear fs-4",
            span_text: "Settings",
          },
          {
            href: "/",
            i_class: "bi bi-box-arrow-right fs-4",
            span_text: "Logout",
          },
        ];
        break;
      case "driver":
        userNavItems = [
          {
            href: `${userApp}/Rentals`,
            i_class: "bi bi-receipt fs-4",
            span_text: "Rentals",
          },
          {
            href: `${userApp}/add-problem`,
            i_class: "bi bi-exclamation-circle fs-4",
            span_text: "Add problem",
          },
          {
            href: `${userApp}/Contact-administrator`,
            i_class: "bi bi-envelope fs-4",
            span_text: "Contact administrator",
          },
          {
            href: `${userApp}/Settings`,
            i_class: "bi bi-gear fs-4",
            span_text: "Settings",
          },
          {
            href: "/",
            i_class: "bi bi-box-arrow-right fs-4",
            span_text: "Logout",
          },
        ];
        break;
      case "renter business":
        userNavItems = [
          {
            href: `${userApp}/Rent`,
            i_class: "bi bi-bicycle fs-4",
            span_text: "Rent",
          },
          {
            href: `${userApp}/Rentals`,
            i_class: "bi bi-receipt fs-4",
            span_text: "Rentals",
          },
          {
            href: `${userApp}/Identify-driver`,
            i_class: "bi bi-person-plus fs-4",
            span_text: "Identify driver",
          },
          {
            href: `${userApp}/Drivers-list`,
            i_class: "bi bi-people fs-4",
            span_text: "Drivers list",
          },
          {
            href: `${userApp}/Contact-administrator`,
            i_class: "bi bi-envelope fs-4",
            span_text: "Contact administrator",
          },
          {
            href: `${userApp}/Settings`,
            i_class: "bi bi-gear fs-4",
            span_text: "Settings",
          },
          {
            href: "/",
            i_class: "bi bi-box-arrow-right fs-4",
            span_text: "Logout",
          },
        ];

        break;
      case "garage_manager":
        userNavItems = [
          {
            href: `${userApp}/Check-in-out`,
            i_class: "bi bi-arrow-left-right fs-4",
            span_text: "Check in/out",
          },
          {
            href: `${userApp}/Change-state`,
            i_class: "bi bi-file-ppt fs-4",
            span_text: "Change state",
          },
        ];
        break;
      default:
        userNavItems = [
          {
            href: `${userApp}/Rent`,
            i_class: "bi bi-bicycle fs-4",
            span_text: "Rent",
          },
          {
            href: `${userApp}/Rentals`,
            i_class: "bi bi-receipt fs-4",
            span_text: "Rentals",
          },
          {
            href: `${userApp}/Contact-administrator`,
            i_class: "bi bi-envelope fs-4",
            span_text: "Contact administrator",
          },
          {
            href: `${userApp}/Settings`,
            i_class: "bi bi-gear fs-4",
            span_text: "Settings",
          },
          {
            href: "/",
            i_class: "bi bi-box-arrow-right fs-4",
            span_text: "Logout",
          },
        ];
        break;
    }
    return userNavItems;
  };

  return (
    <nav
      className="mainNav navbar navbar-expand-lg col-lg-2 side-navbar fixed-top"
      id="sidebar"
    >
      <div className="container flex-lg-column mb-auto ">
        <Logo />
        <div className="collapse navbar-collapse " id="side-navbar">
          <ul className="navbar-nav flex-column mb-auto mt-2 mb-lg-0 navbar-nav-side">
            <Navitem userNavItems={defineUser()} />
          </ul>
        </div>
      </div>
    </nav>
  );
};
