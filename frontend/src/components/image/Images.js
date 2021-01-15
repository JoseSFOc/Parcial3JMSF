import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Images = ({ _id, description, imageUrl, hashtags, author, likes }) => {
  return (
    <Card style={{ width: "18rem" }}>
      {imageUrl ? <Card.Img variant="top" src={imageUrl} /> : <></>}
      <Card.Body>
        <Card.Title>By {author.name}</Card.Title>
        <Card.Subtitle>Likes {likes}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Link to={`/images/${_id}`}>More...</Link>
      </Card.Body>
    </Card>
  );
};

export default Images;
