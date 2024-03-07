import React from "react";

import { Outlet } from "react-router-dom";

const Main = () => (
  <div className="content">
    <div className="container">
      <div className="main">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Main;
