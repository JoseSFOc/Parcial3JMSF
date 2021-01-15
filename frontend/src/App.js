import "./App.css";
import React, { useState } from "react";
import RouterSetup from "./components/nav-bar/RouterSetup";
import Login from "./components/login";

function App() {
  const [token, setToken] = useState();

  if (token) {
    return <RouterSetup token={token} />;
  } else {
    return <Login setToken={setToken} />;
  }
}

export default App;
