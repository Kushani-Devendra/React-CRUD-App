import React, { Component } from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {};

type State = {};

export default class Header extends Component<Props, State> {
  state = {};

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" className="navbar">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="nav-link" as={Link} to="/">
                  Overview
                </Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/organizations">
                  Organizations
                </Nav.Link>
                <Nav.Link className="nav-link" as={Link} to="/users">
                  Users
                </Nav.Link>
              </Nav>
              <div className="profile-details">
                <Navbar.Text>Leo Blair</Navbar.Text>
                <Image
                  fluid
                  roundedCircle
                  className="profile-img"
                  src="https://i.pravatar.cc/"
                />
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
