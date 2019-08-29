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
import { Form } from "react-bootstrap";

import HMatcher from "../Helpers/HMatcher";
import ProductItem from "../Components/ProductItem";

const samples = [
    "1 crates of beer",
    "1kg of carrots",
    "1 dark beer",
    "1kg of white apples",
    "500g of sweet potatoes"
];

class AddProductForm extends React.Component {
    state = {
        product: null,
        sampleIndex: 0,
        currentSamplePos: 0,
        sampleInterval: null,
        placeholder: ""
    }

    typeSamples = () => {
        let { sampleIndex, currentSamplePos, placeholder } = this.state;
        const sampleStr = samples[sampleIndex];

        if (currentSamplePos === sampleStr.length+25) {
            sampleIndex = this.nextSample();
            currentSamplePos = 0;
            placeholder = "";
        } 
        if (currentSamplePos < sampleStr.length) {
            placeholder += sampleStr[currentSamplePos];
        }
        currentSamplePos += 1;
        this.setState({ sampleIndex, currentSamplePos, placeholder });
    }

    nextSample = () => {
        return Math.floor(Math.random() * (+samples.length));
    }

    componentDidMount() {
        const sampleIndex = this.nextSample();
        const sampleInterval = setInterval(() => {
            this.typeSamples();
        }, 50);
        this.setState({ sampleIndex, sampleInterval });
    }

    onType = (el) => {
        const product = HMatcher.parseProduct(el.target.value);
        this.setState({
            product
        });
    }

    onAddItem = (event) => {
        event.preventDefault();
        const { product } = this.state;
        if (!product) {
            return;
        }
        this.props.triggerItemAdd(product);

        this.setState({
            product: null
        });
    }

    render() {
        const { product, placeholder } = this.state;
        const productFullText = product ? product.fullText : "";

        return <Form onSubmit={this.onAddItem}>
            <Form.Group controlId="formProductInput">
                <Form.Control
                    autoCorrect="off"
                    autoComplete="off"
                    value={productFullText}
                    className="inputField"
                    onChange={this.onType}
                    placeholder={placeholder}
                    type="text" />

                {productFullText &&
                    <div className="suggestions">
                        <ProductItem onClick={this.onAddItem} item={product} />
                    </div>
                }
            </Form.Group>
        </Form>;
    }
}

export default AddProductForm;