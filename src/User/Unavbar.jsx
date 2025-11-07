// src/components/Navbar.js

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Unavbar = () => {
  const get = localStorage.getItem("user");
  return (
    <Navbar bg="" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/uhome" style={{ color: "white", textDecoration: "none" }}>
            Trip_Planner
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link
              to="/uhome"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "italic",
              }}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "italic",
              }}
            >
              Destinations
            </Link>
            <Link
              to="/testimonials"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "italic",
              }}
            >
              Testimonials
            </Link>
            <Link
              to="/about"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "revert-layer",
              }}
            >
              About
            </Link>

            <Link
              to="/plans"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "revert-layer",
              }}
            >
              My Plans
            </Link>
            <Link
              to="/mytrips"
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "revert-layer",
              }}
            >
              My Trips
            </Link>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("user");
                // Remove JWT token from cookies
                document.cookie =
                  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              }}
              style={{
                padding: "10px",
                color: "whitesmoke",
                textDecoration: "none",
                fontSize: "22px",
                fontStyle: "revert-layer",
              }}
            >
              Logout
            </Link>
            <h4 style={{ color: "white", paddingTop: "0px" }}>
              ({JSON.parse(get).name} )
            </h4>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
