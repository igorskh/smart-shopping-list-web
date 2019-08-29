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

import fuzz from "fuzzball";

import HStrings from "./HStrings";

import quantityTypes from "../Datasets/quantity_types.json";
import products from "../Datasets/products.json";

const fuzzOptions = { cutoff: 80, scorer: fuzz.ratio };

function checkProductSynonym(productID, useProducts) {
    if (useProducts[productID].hasOwnProperty("ref") && useProducts[productID].hasOwnProperty("refType")
        && useProducts[productID]["refType"] === "synonym") {
        return useProducts[productID]["ref"];
    }
    return productID;
}

function matchProduct(val, reverse = false, customProducts = null) {
    let useProducts = products;
    if (customProducts) {
        useProducts = customProducts;
    }

    let parts = val.split(" ");
    if (reverse) {
        parts.reverse();
    }
    let desc = "";
    let found = false;
    for (let i = 0; i < parts.length; i++) {
        const part = HStrings.sliceJoin(parts, i);
        if (part.length === 0) {
            continue;
        }
        const results = fuzz.extract(part, Object.keys(useProducts), fuzzOptions);
        if (results.length > 0) {
            found = true;
            val = results[0][0];
            desc = HStrings.sliceJoin(parts, 0, i);
            if (reverse) {
                desc = desc.split(" ").reverse().join(" ");
            }
            break;
        }
    }
    if (found) {
        val = checkProductSynonym(val, useProducts);
    }
    return {
        found,
        val,
        desc
    };
}

function matchQuantity(val) {
    const re = /((\d+)\s{0,}([a-zA-Z]*))(?:\s|$)/gm;

    let match;
    while ((match = re.exec(val)) != null) {
        if (match[3].length === 0) {
            continue;
        }
        const results = fuzz.extract(match[3], Object.keys(quantityTypes), fuzzOptions);
        if (results.length > 0) {
            const quantity = match[2];
            const quantityType = results[0][0];
            const product = HStrings.substringParts(val, match.index, match.index + match[1].length + 1);
            return {
                quantity, quantityType, product
            };
        } else {
            return {
                quantity: match[2],
                quantityType: null,
                product: HStrings.substringParts(val, match.index, match.index + match[2].length + 1)
            };
        }
    }
    return null;
}

function parseProduct(inputValue, customProducts = null) {
    let useProducts = products;
    if (customProducts) {
        useProducts = customProducts;
    }

    let val = HStrings.removeExtraWhitespaces(inputValue);
    val = HStrings.removePrepositions(val.split(" "));

    let quantity;
    let quantityType;
    let resQuantity = matchQuantity(val);

    if (resQuantity) {
        quantity = parseInt(resQuantity.quantity);
        quantityType = resQuantity.quantityType;
        val = resQuantity.product;
    }

    let resProduct = matchProduct(val);
    if (!resProduct.found) {
        resProduct = matchProduct(val, true);
    }
    let productTitle = resProduct.val;
    if (resProduct.found) {
        productTitle = useProducts[resProduct.val].title;
        if (!quantityType) {
            quantityType = useProducts[resProduct.val].defaultMetric;
        }
        if (!quantity) {
            quantity = parseInt(useProducts[resProduct.val].defaultQuantity);
        }
    }

    return {
        added: false,
        fullText: inputValue,
        quantity,
        quantityType: getRootQuantityType(quantityType),
        productTitle,
        productID: resProduct.val,
        productDesc: resProduct.desc
    };
}

function getRootQuantityType(quantityType) {
    if (!quantityTypes.hasOwnProperty(quantityType)) {
        return quantityType;
    }
    let quantityTypeObj = quantityTypes[quantityType];
    if (quantityTypeObj.hasOwnProperty("refType") && quantityTypeObj.refType === "synonym") {
        return getRootQuantityType(quantityTypeObj["ref"]);
    }
    return quantityType;
}

const HMatcher = {
    matchProduct,
    matchQuantity,
    parseProduct,
    getRootQuantityType
};

export default HMatcher;