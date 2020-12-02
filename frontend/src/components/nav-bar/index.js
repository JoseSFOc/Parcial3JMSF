import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import './navbar.css';

const NavBarMain = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to='/'>
                Graffiti-App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to='/search' as={Link}>
                        Search
                    </Nav.Link>
                    <Nav.Link as={Link} to='/routes'>
                        Routes
                    </Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav>
                    <Nav.Link as={Link} to="/conversations">
                        Conversations
                    </Nav.Link>
                    <Nav.Link as={Link} to="/graffitis">
                        Upload
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                        Profile
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavBarMain;
