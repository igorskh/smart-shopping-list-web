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

import HStrings from "../../Helpers/HStrings";

test("Test removeExtraWhitespaces", () => {
    expect(
        HStrings.removeExtraWhitespaces("Hello new world")
    ).toBe("Hello new world");

    expect(
        HStrings.removeExtraWhitespaces("    Hello    ")
    ).toBe(" Hello ");

    expect(
        HStrings.removeExtraWhitespaces(" Hello    new world ")
    ).toBe(" Hello new world ");
});

test("Test sliceJoin", () => {
    let testArr = ["O", "brave", "new", "world"];
    expect(
        HStrings.sliceJoin(testArr, 0, 0)
    ).toBe("");

    expect(
        HStrings.sliceJoin(testArr, 0, testArr.length)
    ).toBe("O brave new world");

    expect(
        HStrings.sliceJoin(testArr, 2, 3)
    ).toBe("new");

    expect(
        HStrings.sliceJoin(testArr, 0, 2)
    ).toBe("O brave");
});

test("Test substringParts", () => {
    expect(
        HStrings.substringParts("Hello 123 Hello", 0, 0)
    ).toBe("Hello 123 Hello");

    expect(
        HStrings.substringParts("Hello 123 Hello", 0, 15)
    ).toBe("");

    expect(
        HStrings.substringParts("Hello 123 Hello", 6, 10)
    ).toBe("Hello Hello");
});

test("Test removePrepositions", () => {
    expect(
        HStrings.removePrepositions("I do not have any preps".split(" "))
    ).toBe("I do not have any preps");

    expect(
        HStrings.removePrepositions("of von for".split(" "), 0, 15)
    ).toBe("");

    expect(
        HStrings.removePrepositions("Apples for me".split(" "), 0, 15)
    ).toBe("Apples me");
});