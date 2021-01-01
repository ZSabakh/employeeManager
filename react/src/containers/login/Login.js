import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";

const Login = (props) => {
  const [redirect, setRedirecting] = useState(false);
  const onLoginClick = () => {
    setRedirecting(true);
    props.authorized(true);
  };

  return (
    <>
      <div className="login_content">
        <div className="login_form">
          <div className="login_logo"></div>
          <input placeholder="Username"></input>
          <input placeholder="Password"></input>
          {redirect ? <Redirect to="/home" /> : null}
          <button
            onClick={() => {
              onLoginClick();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
