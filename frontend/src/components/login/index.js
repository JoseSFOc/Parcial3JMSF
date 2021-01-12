import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useFetch } from "../../custom-hooks/useFetch";

//const url = "http://localhost:3030/login";
const url = "https://mern-template-web2020.herokuapp.com/login/";

const Login = () => {
  const [token, setToken] = useState({});
  const [clientID, setClientID] = useState("");
  const { products } = useFetch(url);

  useEffect(() => {
    console.log(products);
    setClientID(products);
  }, [url]);

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
  };

  const responseError = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={clientID}
      buttonText="Login"
      onSuccess={responseSuccess}
      onFailure={responseError}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Login;
