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