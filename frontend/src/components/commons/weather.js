import React from "react";
import { Container } from "react-bootstrap";
import { useFetch } from "../../custom-hooks/useFetch";

const Weather = ({ lat, lon }) => {
  const url = `https://mern-template-web2020.herokuapp.com/weather?lat=${lat}&lon=${lon}`;
  const { products } = useFetch(url);

  if (products.main) {
    return (
      <div>
        <p style={{ color: "white" }}>
          {products.name} | {products.main.temp}°C{" "}
          <img
            style={{ maxWidth: "5rem", maxHeight: "5rem" }}
            src={products.icon}
            alt="weather-icon"
          />
        </p>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Weather;
