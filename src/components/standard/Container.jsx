import React from "react";
import Drawer_pfc from "./Drawer";
import { Outlet } from "react-router-dom";

function Container(props) {
  return (
    <div className="main-conatiner">
      <div className="DC-conatiner">
        <Drawer_pfc />

        <Outlet />
      </div>
    </div>
  );
}

export default Container;
