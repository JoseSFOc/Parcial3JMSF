import React from "react";
import { useFetch } from "../../custom-hooks/useFetch";

const Weather = ({ lat, lon }) => {
  const url = `http://localhost:3030/weather?lat=${lat}&lon=${lon}`;
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
