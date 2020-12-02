import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextArea from "./TextArea";
import Comment from "./Comment.js";

const Comments = (props) => {
  const [comments, setComments] = useState([]);

  let userName = props.userName;
  let userId = props.userId;
  let type = props.type; //It can be 'Graffiti' or 'Route'
  let typeId = props.typeId;

  let updateComments = () => {
    let url =
      type === "Graffiti"
        ? "https://web2020-api.herokuapp.com/comments?graffiti="
        : "https://web2020-api.herokuapp.com/comments?route=";
    url += typeId;
    fetch(url)
      .then((raw) => raw.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.log("error", error));
  };

  let deleteComment = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("https://web2020-api.herokuapp.com/comments/" + id, requestOptions)
      .then(() => updateComments())
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    updateComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Row>
        <TextArea
          authorName={userName}
          authorId={userId}
          type={type}
          typeId={typeId}
          commentSent={updateComments}
        ></TextArea>
      </Row>
      <Row>
        <Col>
          {comments.map((c, index) => (
            <Comment
              key={c._id + c.votes.positives.length + c.votes.negatives.length}
              comment={c}
              deleteComment={deleteComment}
              userId={userId}
              updateComments={updateComments}
            ></Comment>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Comments;
