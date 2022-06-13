import React from "react";
import { NavLink } from "react-router-dom";

export const Navitem = ({ userNavItems}) => {

  return userNavItems.map((navitem, index) => (
    <NavLink to={navitem.href} className="nav-link" key={index}>
      <li className="nav-item px-lg-0 px-2 my-0 fs-6 d-flex align-items-center">
        <i className={navitem.i_class}></i>
        <span className="item position-relative mx-2">{navitem.span_text}</span>
      </li>
    </NavLink>
  ));
};
