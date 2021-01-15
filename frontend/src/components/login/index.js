import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";

//const url = "http://localhost:3030/login";
const url = "https://parcial3-jmsf.herokuapp.com/login/";

const Login = (props) => {
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
      .then((token) => props.setToken(token));
  };

  const responseError = (response) => {
    console.log(response);
  };

  if (clientID) {
    return (
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          backgroundImage: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2
            style={{
              color: "white",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            Template App
          </h2>
        </div>

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
      </div>
    );
  } else {
    return <></>;
  }
};

export default Login;
