import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBarMain = ({ token }) => {
  const logout = () => {
    window.location.reload();
  };

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      style={{
        backgroundImage: "linear-gradient(120deg, #6CE67D 0%, #C5F951 100%)",
        height: "4rem",
      }}
      variant="dark"
    >
      <Navbar.Brand as={Link} to="/">
        PhotoNet
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Nav.Link as={Link} to="/upload">
              Upload
            </Nav.Link>
          </Nav>
        </Nav>

        <Nav className="m-auto">
          <Nav>
            <Nav.Item style={{ color: "white" }}>
              Bienvenido {token.user.name}
            </Nav.Item>
          </Nav>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="light" onClick={logout}>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Log Out
            </Link>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBarMain;
