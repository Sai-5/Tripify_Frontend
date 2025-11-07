// src/components/Navbar.js

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  //   const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Tripify
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link
              to="/ulogin"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "revert-layer",
              }}
            >
              User
            </Link>
            <Link
              to="/alogin"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "revert-layer",
              }}
            >
              Admin
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
