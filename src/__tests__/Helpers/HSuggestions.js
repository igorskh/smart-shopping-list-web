import HSuggestions from "../../Helpers/HSuggestions";

import suggestions from "../Datasets/suggestions.json";

test("Test getSuggestions length", () => {
    expect(
        HSuggestions.getSuggestions("beer", suggestions).length
    ).toBe(2);

    expect(
        HSuggestions.getSuggestions("milk", suggestions).length
    ).toBe(2);

    expect(
        HSuggestions.getSuggestions("carrots", suggestions).length
    ).toBe(0);
});


test("Test getSuggestions value", () => {
    expect(
        HSuggestions.getSuggestions("beer", suggestions)[0].title
    ).toBe("My Company's Beer");
    
    expect(
        HSuggestions.getSuggestions("beer", suggestions)[0].cost
    ).toBe(2);

    expect(
        typeof(HSuggestions.getSuggestions("milk", suggestions))
    ).toBe("object");
});