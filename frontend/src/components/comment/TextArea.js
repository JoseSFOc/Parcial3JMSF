import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default (props) => {
  const [textArea, setTextArea] = useState("Lorem ipsum dolor sit amet");

  let authorId = props.authorId;
  let authorName = props.authorName;
  let type = props.type;
  let typeId = props.typeId;

  let handleSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      message: textArea,
      author: { _id: authorId, name: authorName },
      parent: { type: type, _id: typeId },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://web2020-api.herokuapp.com/comments/", requestOptions)
      .then((response) => response.text())
      .then(() => {
        props.commentSent();
        setTextArea("");
        console.log("TODO: Show success toast");
      })
      .catch((error) => console.log(error, "error"));
  };

  return (
    <Col>
      <Form>
        <Form.Group>
          <Form.Label>
            Comment as <a href={"/profile/"}>{authorName}</a>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            onChange={(event) => setTextArea(event.target.value)}
            value={textArea}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Col>
  );
};
