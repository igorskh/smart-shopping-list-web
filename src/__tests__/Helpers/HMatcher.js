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

import HMatcher from "../../Helpers/HMatcher";

import products from "../Datasets/products.json";

test("Test matchProduct", () => {
    expect(
        HMatcher.matchProduct("Potatoes", false, products)
    ).toStrictEqual({ "desc": "", "found": true, "val": "potatoes" });

    expect(
        HMatcher.matchProduct("pOtAtO", false, products)
    ).toStrictEqual({ "desc": "", "found": true, "val": "potatoes" });

    expect(
        HMatcher.matchProduct("Kittens", false, products)
    ).toStrictEqual({ "desc": "", "found": false, "val": "Kittens" });

    expect(
        HMatcher.matchProduct("Cold Potatoes", false, products)
    ).toStrictEqual({ "desc": "Cold", "found": true, "val": "potatoes" });

    expect(
        HMatcher.matchProduct("Sweet Potatoes", false, products)
    ).toStrictEqual({ "desc": "", "found": true, "val": "sweet potatoes" });

    expect(
        HMatcher.matchProduct("Potatoes Sweet", false, products)
    ).toStrictEqual({ "desc": "", "found": false, "val": "Potatoes Sweet" });

    expect(
        HMatcher.matchProduct("Potatoes Sweet", true, products)
    ).toStrictEqual({ "desc": "", "found": true, "val": "sweet potatoes" });

});

test("Test matchQuantity", () => {
    expect(
        HMatcher.matchQuantity("Potatoes")
    ).toBe(null);

    expect(
        HMatcher.matchQuantity("1kg Potatoes")
    ).toStrictEqual({
        "product": "Potatoes",
        "quantity": "1",
        "quantityType": "kg"
    });

    expect(
        HMatcher.matchQuantity("1 Potatoes")
    ).toStrictEqual({
        "product": "Potatoes",
        "quantity": "1",
        "quantityType": null
    });

    expect(
        HMatcher.matchQuantity("Potatoes 2kg")
    ).toStrictEqual({
        "product": "Potatoes ",
        "quantity": "2",
        "quantityType": "kg"
    });

    expect(
        HMatcher.matchQuantity("Potatoes 2kg Cold")
    ).toStrictEqual({
        "product": "Potatoes Cold",
        "quantity": "2",
        "quantityType": "kg"
    });
});

test("Test getRootQuantityType", () => {
    expect(
        HMatcher.getRootQuantityType("kilo")
    ).toBe("kg");

    expect(
        HMatcher.getRootQuantityType("kg")
    ).toBe("kg");

    expect(
        HMatcher.getRootQuantityType("none")
    ).toBe("none");
});

test("Test parseProduct", () => {
    expect(
        HMatcher.parseProduct("Potatoes 2kg Cold", products)
    ).toStrictEqual({
        "added": false,
        "fullText": "Potatoes 2kg Cold",
        "productDesc": "Cold",
        "productID": "potatoes",
        "productTitle": "Potatoes",
        "quantity": 2,
        "quantityType": "kg"
    });

    expect(
        HMatcher.parseProduct("Potatoes Cold", products)
    ).toStrictEqual({
        "added": false,
        "fullText": "Potatoes Cold",
        "productDesc": "Cold",
        "productID": "potatoes",
        "productTitle": "Potatoes",
        "quantity": 1,
        "quantityType": "kg"
    });

    expect(
        HMatcher.parseProduct("")
    ).toStrictEqual({
        "added": false,
        "fullText": "",
        "productDesc": "",
        "productID": "",
        "productTitle": "",
        "quantity": undefined,
        "quantityType": undefined,
    });


    expect(
        HMatcher.parseProduct("2 green APples", products)
    ).toStrictEqual({
        "added": false,
        "fullText": "2 green APples",
        "productDesc": "green",
        "productID": "apples",
        "productTitle": "Apples",
        "quantity": 2,
        "quantityType": "kg",
    });
});