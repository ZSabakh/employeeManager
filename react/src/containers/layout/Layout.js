import React from "react";
import Home from "../home/Home";
import Login from "../login/Login";
import Detailed from "../detailed/Detailed";
import { Route, Redirect, useLocation } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu";
import FaceRec from "../faceRec/FaceRec";
import { useState } from "react";

const Layout = () => {
  const [authorized, setAuthorized] = useState(false);
  const CURRENT_PATH = useLocation().pathname;
  return (
    <>
      {authorized ? <SideMenu /> : null}
      <Route
        exact
        path="/"
        render={(props) => (
          <Login
            {...props}
            authorized={(callBackValue) => setAuthorized(callBackValue)}
          />
        )}
      />
      <div className="content_container">
        {authorized != true && CURRENT_PATH != "/" ? <Redirect to="/" /> : null}

        {authorized ? (
          <>
            <Route exact path="/home" component={Home} />
            <Route path="/detailed" component={Detailed} />
            <Route path="/facerec" component={FaceRec} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Layout;
