import fuzz from "fuzzball";

import HStrings from "./HStrings";

import quantityTypes from "../Datasets/quantity_types.json";
import products from "../Datasets/products.json";

const fuzzOptions = { cutoff: 85, scorer: fuzz.ratio };

function matchProduct(val, reverse = false) {
    let parts = val.split(" ");
    if (reverse) {
        parts.reverse();
    }
    let desc = "";
    let found = false;
    for (let i = 0; i < parts.length; i++) {
        const part = HStrings.sliceJoin(parts, i);
        if (part === "") {
            continue;
        }
        const results = fuzz.extract(part, Object.keys(products), fuzzOptions);
        if (results.length > 0) {
            val = results[0][0];
            found = true;
            desc = HStrings.sliceJoin(parts, 0, i);
            break;
        }
    }
    return {
        found,
        val,
        desc
    };
}

function matchQuantity(val) {
    const re = /((\d+)\s{0,}([a-zA-Z]+))(?:\s|$)/gm;

    let match;
    while ((match = re.exec(val)) != null) {
        const results = fuzz.extract(match[3], Object.keys(quantityTypes), fuzzOptions);
        if (results.length > 0) {
            const quantity = match[2];
            const quantityType = results[0][0];
            const product = HStrings.substringParts(val, match.index, match.index + match[1].length + 1);
            return {
                quantity, quantityType, product
            };
        }
    }
    return null;
}

function parseProduct(inputValue) {
    let val = HStrings.removeExtraWhitespaces(inputValue);
    val = HStrings.removePrepositions(val.split(" "));

    let quantity;
    let quantityType;
    let resQuantity = matchQuantity(val);

    if (resQuantity) {
        quantity = resQuantity.quantity;
        quantityType = resQuantity.quantityType;
        val = resQuantity.product;
    }

    let resProduct = matchProduct(val);
    if (!resProduct.found) {
        resProduct = matchProduct(val, true);
    }

    return {
        fullText: inputValue,
        quantity,
        quantityType,
        productTitle: resProduct.val,
        productDesc: resProduct.desc
    };
}

const HMatcher = {
    parseProduct
};

export default HMatcher;