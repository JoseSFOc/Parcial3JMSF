import React, { useState, useReducer } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { reducer } from "./reducer";
import Modal from "./Modal";

const initialState = {
  isModalOpen: false,
  modalContent: "",
};

const url = "https://web2020-api.herokuapp.com/graffitis/";

const createGraffiti = async (graffiti) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graffiti),
    redirect: "follow",
  });
};

const updateGraffiti = async (graffiti) => {
  await fetch(url + graffiti._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graffiti),
    redirect: "follow",
  });
};

const GraffitiForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validated, setValidated] = useState(false);
  const [graffiti, setGraffiti] = useState(
    props.editGraffiti || {
      title: "",
      author: { author_id: "5fc239bd81249d00176aa6d0", name: "ElPepe" },
      description: "",
      image: "",
      state: "",
      tags: [],
      location: { lat: 0, lon: 0 },
    }
  );

  const greeting = props.editGraffiti ? (
    <h2 style={{ marginBottom: "2rem" }}>Edit graffiti</h2>
  ) : (
    <h2 style={{ marginBottom: "2rem" }}>New Graffiti</h2>
  );
  const submit = props.editGraffiti ? "Edit" : "Submit";

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "lat" || name === "lon") {
      setGraffiti({
        ...graffiti,
        location: { ...graffiti.location, [name]: value },
      });
    } else {
      setGraffiti({ ...graffiti, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    if (
      graffiti.title &&
      graffiti.author &&
      graffiti.description &&
      graffiti.image
    ) {
      if (graffiti._id) {
        updateGraffiti(graffiti);
        dispatch({ type: "UPDATE_ITEM" });
        setValidated(true);
      } else {
        createGraffiti(graffiti);
        dispatch({ type: "ADD_ITEM" });
        setGraffiti({
          title: "",
          description: "",
          image: "",
          state: "",
          tags: [],
          location: { lat: 0, lon: 0 },
        });
        setValidated(false);
      }
    } else {
      dispatch({ type: "NO_VALUE" });
      setValidated(true);
    }
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Container>
      {greeting}
      {!state.isModalOpen || (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <Form noValidate validated={validated}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={graffiti.title}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please insert a title.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            name="description"
            value={graffiti.description}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please insert a description.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="imgur url"
            name="image"
            value={graffiti.image}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please a valid image.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            name="state"
            value={graffiti.state}
            onChange={handleChange}
          >
            <option>New</option>
            <option>Old</option>
            <option>Washed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="tags"
            value={graffiti.tags}
            onChange={handleChange}
          />
        </Form.Group>
        <h4 style={{ marginTop: "1rem" }}>Location</h4>
        <Form.Row>
          <Form.Group as={Col} controlId="lat">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              name="lat"
              value={graffiti.location.lat}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="lon">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              name="lon"
              value={graffiti.location.lon}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Button
          type="submit"
          style={{ marginBottom: "2rem" }}
          onClick={handleSubmit}
        >
          {submit}
        </Button>
      </Form>
    </Container>
  );
};

export default GraffitiForm;
