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