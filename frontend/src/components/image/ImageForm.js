import React, { useState, useReducer } from "react";
import { Container, Form, Col, Button, Image } from "react-bootstrap";
import { reducer } from "../modal/reducer";
import Modal from "../modal/Modal";
import uploadImage from "../commons/uploadImage";

const url = "http://localhost:3030/images/";

const createImage = async (image) => {
  console.log(image);
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image),
    redirect: "follow",
  });
};

const initialState = {
  isModalOpen: false,
  modalContent: "",
};

const ImageForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validated, setValidated] = useState(false);
  const [valueText, setValueText] = useState("");
  const [image, setImage] = useState({
    description: "",
    imageUrl: "",
    hashtags: [],
    author: props.token.user,
  });

  const addHashtag = () => {
    if (valueText !== "") {
      setImage({ ...image, hashtags: [...image.hashtags, "#" + valueText] });
      setValueText("");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "hashtag") {
      setValueText(value);
    } else {
      setImage({ ...image, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    if (image.description) {
      createImage(image);
      dispatch({ type: "ADD_ITEM" });
      setImage({
        description: "",
        imageUrl: "",
        hashtags: [],
        author: {},
      });
      setValidated(false);
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
      <h1>Upload an image</h1>
      {!state.isModalOpen || (
        <Modal closeModal={closeModal} modalContent={state.modalContent} />
      )}
      <Form
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        noValidate
        validated={validated}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="image">
            <Form.Label>Image</Form.Label>
            <br />
            {image.imageUrl ? (
              <Form.Label>
                <Image
                  style={{ maxHeight: "171px", maxWidth: "180px" }}
                  rounded
                  id="imagen-imgur"
                  src={image.imageUrl}
                  alt="preview"
                  name="imagen-imgur"
                />
              </Form.Label>
            ) : (
              <div></div>
            )}

            <Form.Control
              type="file"
              name="image"
              className="input-image"
              onChange={() => uploadImage({ image, setImage: setImage })}
            />
            <Form.Control.Feedback type="invalid">
              Please insert a image.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
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
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="hashtags">
            <Form.Label>Hashtags</Form.Label>
            <Form.Control
              name="hashtag"
              type="text"
              value={valueText}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            style={{ height: "3rem", marginTop: "2rem" }}
            variant="secondary"
            onClick={addHashtag}
          >
            Add
          </Button>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="info">
            <Form.Label>Added hashtags: {image.hashtags}</Form.Label>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {props.editImage ? "Edit" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
};

export default ImageForm;
