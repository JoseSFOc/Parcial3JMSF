import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBarMain = () => {
  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand as={Link} to="/">
        Template App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Nav.Link as={Link} to="/tables">
              Tables
            </Nav.Link>
            <Nav.Link as={Link} to="/form">
              Form
            </Nav.Link>
            <Nav.Link as={Link} to="/map">
              Map
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBarMain;
