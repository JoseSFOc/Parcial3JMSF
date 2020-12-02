import React from "react";
import Templates from "./Templates";
import { useFetch } from "../../custom-hooks/useFetch";
import { Container } from "react-bootstrap";

const url = "http://localhost:3030/templates/";

const TemplateList = () => {
  const { products } = useFetch(url);

  if (products) {
    return (
      <Container>
        <h1>Templates</h1>
        <section className="products">
          {products.map((template) => {
            return <Templates key={template._id} {...template} />;
          })}
        </section>
      </Container>
    );
  } else {
    return <div>There're no templates yet</div>;
  }
};

export default TemplateList;
