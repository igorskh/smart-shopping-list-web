import React from "react";

import posed from "react-pose";
import { tween } from "popmotion";
import { interpolate } from "flubber";

import "../Styles/CartSmile.css";

const paths = {
    eye:
        "M25,80.25c8.666,-10.834 25.999,-32.5 39,-32.5c13.001,0 30.334,21.666 39,32.5",
    circle:
        "M64,40c-13.2,0 -24,10.8 -24,24c0,13.2 10.8,24 24,24c13.2,0 24,-10.8 24,-24c0,-13.2 -10.8,-24 -24,-24Z",
    mouth:
        "M269,33c-4.667,-9.5 -98.353,-11.601 -131,-1c-29.89,9.706 -81.493,49.526 -64.884,64.605c24.076,21.858 71.57,1.492 92.888,-7.606c33.167,-14.154 107.663,-46.499 102.996,-55.999Z",
    mouth1:
        "M270,40c1.5,-14 -74.686,-16.5 -111,-16c-36.267,0.499 -123.493,3.921 -106.884,19c24.076,21.858 74.886,67.88 97.884,64.999c33.167,-4.154 118.5,-53.999 120,-67.999Z"

};
const pathIds = Object.keys(paths);

const morphTransition = ({ from, to }) =>
    tween({
        from: 0,
        to: 1
    }).pipe(interpolate(from, to));

const Icon = posed.path(
    pathIds.reduce((config, id) => {
        config[id] = {
            d: paths[id],
            transition: morphTransition
        };

        return config;
    }, {})
);

class CartSmile extends React.Component {
    state = {
        pathIndexEyes: 1,
        pathIndexMouth: 2
    }

    setCartSmile = (isSad, cb, timeout = 300) => {
        this.setState({
            pathIndexEyes: isSad ? 1 : 0, 
            pathIndexMouth: isSad ? 2 : 3
        }, () => {
            if (cb) {
                setTimeout(() => {
                    cb();
                }, timeout);
            }
        });
    }

    render() {
        const { pathIndexEyes, pathIndexMouth } = this.state;
        return <div className="cart-body">
            <svg className="cart-eye" width="80" height="80" viewBox="0 0 128 128">
                <Icon pose={pathIds[pathIndexEyes]} />
            </svg>
            <svg className="cart-eye" width="80" height="80" viewBox="0 0 128 128">
                <Icon pose={pathIds[pathIndexEyes]} />
            </svg>
            <br />
            <svg className="cart-mouth" width="180" height="180" viewBox="0 0 256 256">
                <Icon pose={pathIds[pathIndexMouth]} />
            </svg>
        </div>;
    }
}

export default CartSmile;