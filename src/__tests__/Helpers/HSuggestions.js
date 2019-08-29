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