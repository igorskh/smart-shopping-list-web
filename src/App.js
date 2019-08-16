import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {
  render() {
    return <Container>
      <Row>
        <Col></Col>
        <Col lg={6} md={6} sm={12}>
          
        </Col>
        <Col></Col>
      </Row>
    </Container>;
  }
}

export default App;
