import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../custom-hooks/useFetch";
import {
  Image,
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";
import defaultImg from "../../assets/noImage.jpg";
import GraffitiForm from "./Form";
import Comments from "../comment/Comments";
import Votes from "../comment/Votes";

const url = "https://web2020-api.herokuapp.com/graffitis/";

const Graffiti = () => {
  const [graffiti, setGraffiti] = useState({});
  const { _id } = useParams();
  const { products } = useFetch(url + _id);
  const img = graffiti.image || defaultImg;
  const loggedUser = {};

  const updateGraffiti = async () => {
    const response = await fetch(url + _id);
    const newGraffiti = await response.json();
    setGraffiti(newGraffiti);
  };

  // Change loggedUser for active user
  const accordion =
    graffiti.author || loggedUser ? (
      <Row style={{ marginTop: "2rem" }}>
        <Col>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Edit
                </Accordion.Toggle>{" "}
                <Button
                  variant="danger"
                  onClick={() => removeGraffiti(graffiti._id)}
                >
                  <Link
                    to="/"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Delete
                  </Link>
                </Button>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <GraffitiForm editGraffiti={graffiti} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    ) : (
      <Row></Row>
    );

  useEffect(() => {
    setGraffiti(products);
  }, [products]);

  const removeGraffiti = (id) => {
    fetch(url + id, {
      method: "DELETE",
    });
  };

  if (graffiti.author) {
    return (
      <div className="container">
        <Container>
          <Row>
            <Col>
              <h1>{graffiti.title}</h1>
              <h2>By {graffiti.author.name}</h2>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <Image src={img} alt={graffiti.title} fluid />
            </Col>
          </Row>
          {accordion}
          <Row style={{ marginTop: "2rem" }}>
            <Col>
              <p>
                Votes{" "}
                {graffiti.votes.positives
                  ? graffiti.votes.positives.length -
                    graffiti.votes.negatives.length
                  : 0}
                <Votes
                  userId="5fc239bd81249d00176aa6d0"
                  votes={graffiti.votes}
                  update={updateGraffiti}
                  id={graffiti._id}
                  graffitiUrl={url}
                ></Votes>
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{graffiti.description}</p>
              <p>Tags: {graffiti.tags || "No tags"}</p>
              <p>
                Location:{" "}
                {graffiti.location
                  ? graffiti.location.lat + "," + graffiti.location.lon
                  : "NaN"}
              </p>
              <p>{graffiti.date}</p>
              <p>State: {graffiti.state || "NaN"}</p>
            </Col>
          </Row>
        </Container>
        <Accordion style={{ marginBottom: "2rem" }}>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Comments
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Comments
                  userName="ElPepe"
                  userId="5fc239bd81249d00176aa6d0"
                  type="Graffiti"
                  typeId={graffiti._id}
                ></Comments>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  } else {
    return <div className="container"></div>;
  }
};

export default Graffiti;
