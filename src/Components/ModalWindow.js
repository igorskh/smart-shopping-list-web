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

import { Modal, Table } from "react-bootstrap";

class ModalWindow extends React.Component {
    renderSuggesions() {
        const { suggestions, selectedProduct } = this.props;
        if (!selectedProduct) return;
        const quantity = selectedProduct.hasOwnProperty("quantity") ? selectedProduct["quantity"] : 1;

        const rendered = [];
        suggestions.forEach(element => {
            const cost = element.hasOwnProperty("cost") ? element.cost : "N/A";
            rendered.push(<tr key={element.title}>
                <td>{element.title}</td>
                <td>{cost}</td>
                <td>{quantity}</td>
                <td>{cost === "N/A" ? "N/A" : quantity * cost}</td>
            </tr>);
        });
        return rendered;
    }

    render() {
        const { suggestions, show, handleClose, selectedProduct } = this.props;

        return <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Suggested Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {suggestions.length > 0 &&
                    <Table >
                        <thead>
                            <tr>
                                <th>Suggestion</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderSuggesions()}
                        </tbody>
                    </Table>
                }

                {suggestions.length === 0 && selectedProduct &&
                    <h4>No Suggestions for {selectedProduct.productTitle} 😔</h4>
                }
            </Modal.Body>
        </Modal>;
    }
}

export default ModalWindow;