import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetch } from "../../custom-hooks/useFetch";

const url = "https://parcial3-jmsf.herokuapp.com/templates/";

const TemplateTable = () => {
  const { products } = useFetch(url);

  if (products) {
    return (
      <Container>
        <h1>Templates</h1>
        <Table style={{ marginTop: "2rem" }} striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Number</th>
              <th>See More</th>
            </tr>
          </thead>
          <tbody>
            {products.map((template) => {
              return (
                <tr>
                  <td>{template._id}</td>
                  <td>{template.title}</td>
                  <td>{template.author.name}</td>
                  <td>{new Date(template.date).toLocaleDateString()}</td>
                  <td>{template.number}</td>
                  <td>
                    <Button variant="primary">
                      <Link
                        to={`/templates/${template._id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        More...
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return <div>There're no templates yet</div>;
  }
};

export default TemplateTable;
