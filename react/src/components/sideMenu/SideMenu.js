import React from "react";
import "./SideMenu.css";
import { NavLink } from "react-router-dom";

const SideMenu = (props) => {
  return (
    <>
      <div className="side_container">
        <div className="side_logo_container"></div>
        <ul className="side_navigation">
          <li>
            <NavLink
              to="/home"
              style={{ color: "ivory" }}
              activeStyle={{ color: "red" }}
            >
              <div className="side_navigation_link">Home</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/detailed"
              style={{ color: "ivory" }}
              activeStyle={{ color: "red" }}
            >
              <div className="side_navigation_link">Detail</div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/facerec"
              style={{ color: "ivory" }}
              activeStyle={{ color: "red" }}
            >
              <div className="side_navigation_link">Face Recognition</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
