import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { PostData } from "../../services/PostData";
import "./Login.css";

const Login = (props) => {
  const [redirecting, setRedirecting] = useState(false);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  console.log(redirecting);

  const onLoginClick = () => {
    setErrorMessage();
    var loginParams = new URLSearchParams();
    loginParams.append("name", name);
    loginParams.append("password", password);
    PostData("auth/login", loginParams).then(async (resp) => {
      if (resp.token) {
        console.log(resp);
        await localStorage.setItem("token", resp.token);
        props.authorized(true);
        setRedirecting(true);
      }
      if (resp.error) {
        console.log(resp.error);
        setErrorMessage(resp.error.toString());
      }
    });
  };

  return (
    <>
      <div className="login_content">
        <div className="login_form">
          <div className="login_logo"></div>
          <input
            placeholder="Username"
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          {redirecting ? <Redirect to="/home" /> : null}
          <button
            onClick={() => {
              onLoginClick();
            }}
          >
            Login
          </button>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
      </div>
    </>
  );
};

export default Login;
