import React, { useState, useEffect } from "react";
import Images from "./Images";
import { useFetch } from "../../custom-hooks/useFetch";
import { Container, Form, Button, Col } from "react-bootstrap";

const url = "https://parcial3-jmsf.herokuapp.com/images/";

const ImageList = () => {
  const [images, setImages] = useState();
  const { products } = useFetch(url);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setImages(products);
  }, [products]);

  const handleChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url + "?partial=1&description=" + description);
    const newImages = await response.json();
    setImages(newImages);
  };

  if (images) {
    return (
      <Container>
        <h1>Images</h1>
        <Form style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Form.Row>
            <Form.Group as={Col} controlId="description">
              <Form.Label>Search by Description</Form.Label>
              <Form.Control
                required
                name="description"
                type="text"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Search
          </Button>
        </Form>
        <section className="products">
          {images.map((image) => {
            return <Images key={image._id} {...image} />;
          })}
        </section>
      </Container>
    );
  } else {
    return <div>There're no images yet</div>;
  }
};

export default ImageList;
