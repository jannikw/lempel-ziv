import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import { Link, useLocation } from "react-router-dom";
import {
  faBalanceScaleRight,
  faQuestion,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

export function AppNavbar() {
  const location = useLocation();
  const links = [
    { to: "/compare", title: "Compare", icon: faBalanceScaleRight },
    { to: "/steps", title: "Step by Step", icon: faStepForward },
    { to: "/quiz", title: "Quiz", icon: faQuestion },
  ];

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Lempel-Ziv Playground
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {links.map(({ to, title, icon }) => (
              <Nav.Link
                key={to}
                to={to}
                as={Link}
                active={location.pathname === to}
              >
                <FontAwesomeIcon icon={icon} /> {title}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link
              href={"https://github.com/jannikw/lempel-ziv"}
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} /> Source Code
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
