import React, { forwardRef } from "react";

import { Card, Badge, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusSquare, faMinus } from "@fortawesome/free-solid-svg-icons";

class ProductItem extends React.Component {
    render() {
        const { item, id, forwardRef } = this.props;
        return <Card className="product-card" onClick={this.props.onClick} ref={forwardRef}>
            <Card.Body>
                <h4 style={{ float: "left" }}>
                    <b>{item.productTitle}</b> {item.productDesc}<br/>
                    {(item.quantity || item.quantityType) &&
                        <Badge variant="secondary">{item.quantity} {item.quantityType}</Badge>
                    }
                </h4>
                {item.added &&
                    <div style={{ float: "right" }}>
                        <Button
                            variant="outline-dark"
                            onClick={() => this.props.onItemMinus(id)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => this.props.onItemPlus(id)}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={() => this.props.onItemRemove(id)}>
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