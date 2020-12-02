import React from "react";
import Graffitis from "./Graffitis";
import { useFetch } from "../../custom-hooks/useFetch";

const url = "https://web2020-api.herokuapp.com/graffitis";

const GraffitiList = () => {
  const { products } = useFetch(url);

  if (products) {
    return (
      <div className="container">
        <h1>Graffitis</h1>
        <section className="products">
          {products.map((graffiti) => {
            return <Graffitis key={graffiti._id} {...graffiti} />;
          })}
        </section>
      </div>
    );
  } else {
    return <div>There're no graffitis yet</div>;
  }
};

export default GraffitiList;
