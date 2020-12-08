import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Templates = ({ _id, title, author, date, image, number }) => {
  return (
    <Card style={{ width: "18rem" }}>
      {image ? <Card.Img variant="top" src={image} /> : <></>}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>By {author.name}</Card.Subtitle>
        <Card.Text>
          {new Date(date).toLocaleDateString() || "No description"}
        </Card.Text>
        <Link to={`/templates/${_id}`}>More...</Link>
      </Card.Body>
    </Card>
  );
};

export default Templates;
