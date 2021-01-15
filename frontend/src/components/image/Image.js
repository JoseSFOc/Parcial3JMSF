import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFetch } from "../../custom-hooks/useFetch";

const url = "https://parcial3-jmsf.herokuapp.com/images/";

const removeImage = (imageId) => {
  fetch(url + imageId, {
    method: "DELETE",
  });
};

const updateImage = async (image) => {
  await fetch(url + image._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
    redirect: "follow",
  });
};

const Image = ({ token }) => {
  const [image, setImage] = useState({});
  const { _id } = useParams();
  const { products } = useFetch(url + _id);
  const loggedUser = token.user;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setImage({ ...image, [name]: value });
  };

  useEffect(() => {
    setImage(products);
  }, [products]);

  if (image.author) {
    const editDescription =
      loggedUser._id === image.author._id ? (
        <Form.Row>
          <Form.Group as={Col} controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              name="description"
              type="text"
              value={image.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            style={{ height: "3rem", marginTop: "2rem" }}
            onClick={() => updateImage(image)}
          >
            Edit
          </Button>
          <Button
            style={{ height: "3rem", marginTop: "2rem" }}
            variant="danger"
            onClick={() => removeImage(image._id)}
          >
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Delete
            </Link>
          </Button>
        </Form.Row>
      ) : (
        <div>{image.description}</div>
      );

    return (
      <Container>
        <Row>
          <img
            style={{ maxWidth: "30rem", maxHeight: "30rem" }}
            src={image.imageUrl}
            alt={image.description}
          />
        </Row>
        <Row>
          <h4>By {image.author.name}</h4>
        </Row>
        <Row style={{ marginTop: "2rem" }}>
          <Col>{editDescription}</Col>
        </Row>
        <Row>
          <Col>Likes {image.likes}</Col>
        </Row>
        <Row style={{ marginTop: "2rem", marginBottom: "5rem" }}>
          <Col>Hashtags: {image.hashtags}</Col>
        </Row>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default Image;
