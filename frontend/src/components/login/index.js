import React from "react";
import { GoogleLogin } from "react-google-login";

//const url = "http://localhost:3030/login";
const url = "https://mern-template-web2020.herokuapp.com/login";

const Login = () => {
  const responseSuccess = (response) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenId: response.tokenId }),
    })
      .then((res) => res.json())
      .then((token) => console.log(token));
  };

  const responseError = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="307173046892-jn1ksjl0pk67fleme37g84b12n3301vq.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseSuccess}
      onFailure={responseError}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;
