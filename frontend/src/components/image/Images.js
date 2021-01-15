import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const url = "https://parcial3-jmsf.herokuapp.com/images/";

const Images = (image) => {
  const { _id, description, imageUrl, author } = image;
  const [imageSet, setImageSet] = useState(image);

  const updateImage = async (image) => {
    await fetch(url + image._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
      redirect: "follow",
    });
    setImageSet(image);
  };

  return (
    <Card style={{ width: "18rem" }}>
      {imageUrl ? <Card.Img variant="top" src={imageUrl} /> : <></>}
      <Card.Body>
        <Card.Title>By {author.name}</Card.Title>
        <Card.Subtitle>Likes {imageSet.likes}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button
          onClick={() => updateImage({ ...image, likes: image.likes + 1 })}
        >
          Like
        </Button>
        {"   "}
        <Button
          onClick={() => updateImage({ ...image, likes: image.likes - 1 })}
        >
          Dislike
        </Button>
        {"   "}
        <Link to={`/images/${_id}`}>More...</Link>
      </Card.Body>
    </Card>
  );
};

export default Images;
