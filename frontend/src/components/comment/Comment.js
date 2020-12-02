import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Votes from "./Votes";
import DeleteButton from "./DeleteButton";

const Comment = (props) => {
  const [timeFromComment, setTimeFromComment] = useState("");
  const [countVotes, setCountVotes] = useState(0);

  let author = props.comment.author;
  let votes = props.comment.votes;
  let id = props.comment._id;
  let message = props.comment.message;
  let userId = props.userId;

  useEffect(() => {
    setCountVotes(votes.positives.length - votes.negatives.length);
    let displayDifference = "";
    let timeDifference =
      new Date().getTime() - new Date(props.comment.date).getTime();
    if (timeDifference <= 120000) {
      displayDifference = "Less than 1 min ago";
    } else if (timeDifference <= 3.6e6) {
      displayDifference = parseInt(timeDifference / 60000) + " mins ago";
    } else if (timeDifference <= 7.2e6) {
      displayDifference = " 1 hour ago";
    } else if (timeDifference <= 8.64e7) {
      displayDifference = parseInt(timeDifference / 3600000) + " hours ago";
    } else if (timeDifference <= 1.728e8) {
      displayDifference = "1 day ago";
    } else {
      displayDifference = parseInt(timeDifference / 86400000) + " days ago";
    }
    setTimeFromComment(displayDifference);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row className="mt-3">
      <Col xs={2} lg={1}>
        <Image
          src="https://static.independent.co.uk/2020/09/17/09/banksy-flower-thrower.jpg"
          fluid="true"
          roundedCircle
        />
        <Votes
          update={props.updateComments}
          userId={userId}
          votes={votes}
          id={id}
        ></Votes>
      </Col>
      <Col xs={10} lg={11}>
        <Row>
          <a
            href={"/user/" + author._id}
            className="small"
            style={{ color: "inherit" }}
          >
            {author.name}
          </a>
          <p className="small" style={{ color: "grey" }}>
            &nbsp; &#8226; &nbsp;{timeFromComment}&nbsp; &#8226; &nbsp;
            {countVotes} votes
          </p>
          {userId === author._id ? (
            <DeleteButton
              deleteComment={() => props.deleteComment(id)}
            ></DeleteButton>
          ) : undefined}
        </Row>
        <p>{message}</p>
      </Col>
    </Row>
  );
};

export default Comment;
