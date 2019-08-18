import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import AddProductForm from "./Components/AddProductForm";
import ProductList from "./Components/ProductList";

import "bootstrap/dist/css/bootstrap.css";
import "./Styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.productListChild = React.createRef();
  }

  render() {
    return <Container>
      <Row>
        <Col></Col>
        <Col lg={6} md={8} sm={12}>
          <h2>
            <img alt="logo" src="/logo192.png" width="40px"/>
            Smart Shopping List
          </h2>
          <div className="header-bg"></div>
          <AddProductForm
            triggerItemAdd={(item) => this.productListChild.current.onItemAdd(item)} />
          <ProductList
            ref={this.productListChild} />
        </Col>
        <Col></Col>
      </Row>
    </Container>;
  }
}

export default App;
