import React from "react";
import defaultImage from "../../assets/noImage.jpg";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Graffitis = ({
  author,
  votes,
  location,
  tags,
  date,
  _id,
  title,
  description,
  image,
  state,
  comments,
  __v,
}) => {
  const url = image || defaultImage;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>By {author.name}</Card.Subtitle>
        <Card.Text>{description || "No description"}</Card.Text>
        <Link to={`/graffitis/${_id}`}>More...</Link>
      </Card.Body>
    </Card>
  );
};

export default Graffitis;
