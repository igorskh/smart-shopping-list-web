import React, { forwardRef } from "react";

import { Card, Badge, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusSquare, faMinus, faLightbulb } from "@fortawesome/free-solid-svg-icons";

class ProductItem extends React.Component {
    render() {
        const { item, id, forwardRef, onItemMinus, onClick,
            onItemPlus, onItemRemove, onItemClick } = this.props;

        return <Card onClick={onClick} className="product-card" ref={forwardRef}>
            <Card.Body>
                <h4 style={{ float: "left" }}>
                    <b>{item.productTitle}</b> {item.productDesc}<br />
                    {(item.quantity || item.quantityType) &&
                        <Badge variant="secondary">{item.quantity} {item.quantityType}</Badge>
                    }
                </h4>
                {item.added &&
                    <div style={{ float: "right" }}>
                        <Button
                            variant="outline-dark"
                            onClick={() => onItemClick(id)} >
                            <FontAwesomeIcon icon={faLightbulb} />
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => onItemMinus(id)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => onItemPlus(id)}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => onItemRemove(id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                }
            </Card.Body>
        </Card>;
    }
}

function ForwardRef(props, ref) {
    return <ProductItem {...props} forwardRef={ref} />;
}
export default forwardRef(ForwardRef);