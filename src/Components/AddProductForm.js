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