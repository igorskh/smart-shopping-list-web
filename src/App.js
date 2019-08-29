/*
* Copyright 2019 Igor Kim
* This file is part of Smart Shopping List Web.
*
* Smart Shopping List Web is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* Smart Shopping List Web is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with Smart Shopping List Web.  If not, see <https://www.gnu.org/licenses/>.
*/

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
