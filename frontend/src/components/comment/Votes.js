import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";

const Votes = (props) => {
  let votes = props.votes;
  let userId = props.userId;
  let graffitiUrl = props.graffitiUrl || "";
  let dependency = graffitiUrl === "" ? [] : [props];

  const [upvoteSelected, setUpvoteSelected] = useState(false);
  const [downvoteSelected, setDownvoteSelected] = useState(false);

  let sendVote = (method, isUpvote) => {
    let url =
      (graffitiUrl === ""
        ? "https://web2020-api.herokuapp.com/comments/"
        : graffitiUrl) +
      props.id +
      "/votes/";
    url += isUpvote === true ? "positives" : "negatives";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ _id: userId });

    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then(() => {
        console.log("update");
        props.update();
      })
      .catch((error) => console.log("error", error));
  };

  let upvoteNoFill = (
    <a href="#" onClick={() => sendVote("POST", true)}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-arrow-up-circle"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        color="green"
      >
        >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          fillRule="evenodd"
          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
        />
      </svg>
    </a>
  );
  let upvoteFill = (
    <a href="#" onClick={() => sendVote("DELETE", true)}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-arrow-up-circle-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        color="green"
      >
        <path
          fillRule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
        />
      </svg>
    </a>
  );

  let downvoteNoFill = (
    <a href="#" onClick={() => sendVote("POST", false)}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-arrow-down-circle"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        color="red"
      >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          fillRule="evenodd"
          d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
        />
      </svg>
    </a>
  );

  let downvoteFill = (
    <a href="#" onClick={() => sendVote("DELETE", false)}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 16 16"
        className="bi bi-arrow-down-circle-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        color="red"
      >
        <path
          fillRule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
        />
      </svg>
    </a>
  );

  useEffect(() => {
    setUpvoteSelected(
      votes.positives.reduce((exist, v) => {
        return v._id === userId ? true : exist;
      }, false)
    );
    setDownvoteSelected(
      votes.negatives.reduce((exist, v) => {
        return v._id === userId ? true : exist;
      }, false)
    );
  }, dependency); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row className="justify-content-center mt-1">
      {upvoteSelected ? upvoteFill : upvoteNoFill}
      {downvoteSelected ? downvoteFill : downvoteNoFill}
    </Row>
  );
};

export default Votes;
