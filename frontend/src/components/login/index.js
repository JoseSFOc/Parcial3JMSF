import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

//const url = "http://localhost:3030/login";
const url = "https://mern-template-web2020.herokuapp.com/login/";

const Login = () => {
  const [token, setToken] = useState({});
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    fetchClientId();
  }, []);

  const fetchClientId = async () => {
    const res = await fetch(url).then((result) => result.json());
    setClientID(res.clientId);
  };

  const responseSuccess = (response) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId: response.tokenId }),
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((token) => setToken(token));
    <Redirect to="/home" />;
  };

  const responseError = (response) => {
    console.log(response);
  };

  // background-image: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)";

  if (clientID) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <GoogleLogin
          clientId={clientID}
          buttonText="Login"
          onSuccess={responseSuccess}
          onFailure={responseError}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Login;
