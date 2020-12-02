/* import React, { useState } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const url = "https://web2020-api.herokuapp.com/users/";

const createUser = async (user) => {
  console.log(JSON.stringify(user));
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
    redirect: "follow",
  });
  console.log(response);
};

const updateUser = async (user) => {
  console.log(JSON.stringify(user));
  const response = await fetch(url + user._id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    redirect: "follow",
  });
  console.log(response);
};

const UserEdit = (props) => {
  const [user, setUser] = useState(
    props.editUser || {
      _id: "",
      rol: "",
      name: "",
      image: "",
      banner: "",
      experience: 0,
    }
  );

  const greeting = props.editUser ? (
    <h2 style={{ marginBottom: "2rem" }}>Edit User</h2>
  ) : (
      <h2 style={{ marginBottom: "2rem" }}>New User</h2>
    );
  const submit = props.editUser ? "Edit" : "Submit";
  const path = props.editUser ? "" : "/";

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // Only ates one
    if (name === "lat" || name === "lon") {
      setUser({ ...user, location: { [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.name &&
      user.rol &&
      user.experience &&
      user.image
    ) {
      user._id ? updateUser(user) : createUser(User);
      setUser({
        _id: "",
        rol: "",
        name: "",
        image: "",
        banner: "",
        experience: 0,
      });
    }
  };

  return (
    <Container>
      {greeting}
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="rol">
          <Form.Label>Rol</Form.Label>
          <Form.Control
            type="text"
            name="rol"
            value={user.rol}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="experience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            name="experience"
            value={user.experience}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          style={{ marginBottom: "2rem" }}
          variant="primary"
          onClick={handleSubmit}
        >
          <Link
            to={path}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {submit}
          </Link>
        </Button>
      </Form>
    </Container>
  );
};

export default UserEdit;
 */