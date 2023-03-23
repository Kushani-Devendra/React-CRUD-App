import React from "react";
import { Container } from "react-bootstrap";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <Container>
        <div className="footer p-4">ACB (Pvt) Ltd © 2021</div>
      </Container>
    </footer>
  );
};

export default Footer;
