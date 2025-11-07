// src/components/Navbar.js

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Anavbar = () => {
  const get = localStorage.getItem("user");
  return (
    <Navbar
      bg=""
      variant="dark"
      expand="lg"
      style={{ backgroundColor: "teal" }}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/ahome" style={{ color: "white", textDecoration: "none" }}>
            Trip_Planner
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link
              to="/ahome"
              style={{
                padding: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              style={{
                padding: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Users
            </Link>
            <Link
              to="/hotels"
              style={{
                padding: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Hotels
            </Link>
            <Link
              to="/restaurants"
              style={{
                padding: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Restaurants
            </Link>
            <Link
              to="/places"
              style={{
                padding: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Places
            </Link>

            <Link
              to="/alltrips"
              style={{
                padding: "10px",
                color: "white",
                textDecoration: "none",
              }}
            >
              All Trips
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
                color: "white",
                textDecoration: "none",
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

export default Anavbar;
