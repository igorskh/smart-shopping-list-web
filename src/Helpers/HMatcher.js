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

// Searches for a product in a dataset using Fuzzy search
function matchProduct(val, reverse = false, customProducts = null) {
    let useProducts = products;
    if (customProducts) {
        useProducts = customProducts;
    }
    
    // Split string to words
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
        // If fuzzy search returned at least one result
        if (results.length > 0) {
            found = true;
            val = results[0][0];
            // Combine words
            desc = HStrings.sliceJoin(parts, 0, i);
            // Restore words order if reversed search requested
            if (reverse) {
                desc = desc.split(" ").reverse().join(" ");
            }
            // TODO: return all results as suggestions
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

// Searches for a quantity part
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

// Performs input string parsing
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

// Recursively does a synonym search of objectID in dataset
function synonymSearch(objectID, dataset) {
    if (!dataset.hasOwnProperty(objectID)) {
        return objectID;
    }

    let productObj = dataset[objectID];
    if (productObj.hasOwnProperty("ref") && productObj.hasOwnProperty("refType") && productObj["refType"] === "synonym") {
        return checkProductSynonym(productObj["ref"], dataset);
    }
    return objectID;
}

// Recursively checks if productd productID is a synonym and returns a original productID if yes
function checkProductSynonym(productID, useProducts) {
    return synonymSearch(productID, useProducts);
}

// Recursively checks if productd quantityTypeID is a synonym and returns a original quantityTypeID if yes
function getRootQuantityType(quantityTypeID) {
    return synonymSearch(quantityTypeID, quantityTypes);
}

const HMatcher = {
    matchProduct,
    matchQuantity,
    parseProduct,
    getRootQuantityType
};

export default HMatcher;