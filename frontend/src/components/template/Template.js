import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { urlFetch, useFetch } from "../../custom-hooks/useFetch";

const url = "http://localhost:3030/templates/";

const Template = () => {
  const [template, setTemplate] = useState({});
  const { _id } = useParams();
  const { products } = useFetch(url + _id);

  useEffect(() => {
    setTemplate(products);
  }, [products]);

  return (
    <div className="container">
      <h1>Esto son todos los detalles de template</h1>
    </div>
  );
};

export default Template;
