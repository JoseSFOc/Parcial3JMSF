import React, { useState, useEffect, createRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Accordion, Button, Card } from "react-bootstrap";
import { useFetch } from "../../custom-hooks/useFetch";
import TemplateForm from "./Form";

const url = "https://mern-template-web2020.herokuapp.com/templates/";

const removeTemplate = (templateId) => {
  fetch(url + templateId, {
    method: "DELETE",
  });
};

const Template = () => {
  const [template, setTemplate] = useState({});
  const { _id } = useParams();
  const { products } = useFetch(url + _id);
  const loggedUser = {};

  const updateComponent = async () => {
    const response = await fetch(url + _id);
    const newTemplate = await response.json();
    setTemplate(newTemplate);
  };

  const editAccordion =
    template.author || loggedUser ? (
      <Accordion>
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Edit
                </Accordion.Toggle>
              </Col>
              <Col sm={1}>
                <Button
                  variant="danger"
                  onClick={() => removeTemplate(template._id)}
                >
                  <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Delete
                  </Link>
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div ref={createRef()}>
                <TemplateForm
                  editTemplate={template}
                  updateComponent={updateComponent}
                />
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ) : (
      <></>
    );

  useEffect(() => {
    setTemplate(products);
  }, [products]);

  if (template.author) {
    return (
      <Container>
        <h1>{template.title}</h1>
        <h4>By {template.author.name}</h4>
        <Row style={{ marginTop: "2rem" }}>
          <Col>Date: {new Date(template.date).toLocaleDateString()}</Col>
          <Col>Number: {template.number}</Col>
        </Row>
        <Row style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Col>{editAccordion}</Col>
        </Row>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default Template;
