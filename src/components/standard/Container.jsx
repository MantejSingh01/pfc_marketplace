import React from "react";
import Drawer_pfc from "./Drawer";
import { Outlet } from "react-router-dom";

function Container(props) {
  return (
    <div className="main-container">
      <div className="DC-conatiner">
        <Outlet />
      </div>
    </div>
  );
}

export default Container;
