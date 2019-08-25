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