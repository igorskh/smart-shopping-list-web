import React from "react";
import posed, { PoseGroup } from "react-pose";

import ProductItem from "../Components/ProductItem";
import CartSmile from "../Components/CartSmile";

// Define animated variant of ProductItem
const PosedProductItem = posed(ProductItem)({
    enter: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: -100,
        opacity: 0
    },
    static: {
        scale: 1
    },
    merged: {
        scaleX: 1.2,
        scaleY: 1.2,
        transition: {
            ease: "easeIn"
        }
    }
});

class ProductList extends React.Component {
    state = {
        items: [],
        mergedIndex: -1,
        pathIndexEyes: 1,
        pathIndexMouth: 2,
        isEmpty: true
    }

    constructor(props) {
        super(props);
        this.cartSmileChild = React.createRef();
    }

    tryMerge = (itemToAdd) => {
        let { items } = this.state;

        let mergedIndex = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].hash === itemToAdd.hash) {
                mergedIndex = i;
                items[i].quantity += itemToAdd.quantity;
            }
        }
        if (mergedIndex > -1) {
            this.setState({
                items,
                mergedIndex
            }, () => {
                setTimeout(() => {
                    this.setState({
                        mergedIndex: -1
                    });
                }, 300);
            });
        }
        return mergedIndex;
    }

    addItem = (item) => {
        const { items } = this.state;
        item.hash = `${item.productID}-${item.productDesc}-${item.quantityType}`;
        const mergedIndex = this.tryMerge(item);
        if (mergedIndex < 0) {
            item.added = true;
            items.push(item);
            this.setState({ items, isEmpty: false });
        }
    }

    onItemAdd = (item) => {
        const { items } = this.state;

        if (items.length === 0) {
            this.cartSmileChild.current.setCartSmile(false, () => {
                this.addItem(item);
            });
            return;
        }
        this.addItem(item);
    }

    onItemPlus = (index) => {
        const { items } = this.state;
        items[index].quantity++;
        this.setState({ items });
    }

    onItemMinus = (index) => {
        const { items } = this.state;
        items[index].quantity--;
        if (items[index].quantity === 0) {
            return this.onItemRemove(index);
        }
        this.setState({ items });
    }

    onItemRemove = (index, timeout = 300) => {
        const { items } = this.state;
        items.splice(index, 1);
        this.setState({ items }, () => {
            if (items.length === 0) {
                setTimeout(() => {
                    this.setState({ isEmpty: true }, () => {
                        this.cartSmileChild.current.setCartSmile(true);
                    });
                }, timeout);
            }
        });
    }

    createCards = () => {
        const { items, mergedIndex } = this.state;
        const result = [];
        for (let i = items.length - 1; i >= 0; i--) {
            let e = items[i];
            result.push(<PosedProductItem
                key={i}
                id={i}
                pose={mergedIndex === i ? "merged" : "static"}
                item={e}
                onItemPlus={this.onItemPlus}
                onItemMinus={this.onItemMinus}
                onItemRemove={this.onItemRemove} />);
        }
        return result;
    }

    render() {
        const cards = this.createCards();
        const { isEmpty } = this.state;
        return <>
            {
                <center className={`cart-empty ${isEmpty && cards.length === 0 ? "" : "hidden"}`}>
                    <CartSmile ref={this.cartSmileChild} />
                    <h2>Shopping list is empty</h2>
                </center>
            }
            <PoseGroup>{cards}</PoseGroup>
        </>;
    }
}

export default ProductList;