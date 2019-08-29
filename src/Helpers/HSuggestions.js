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

import suggestions from "../Datasets/suggestions.json";

function getSuggestions(productID, customSuggestions) {
    let useSuggestions = suggestions;
    if (customSuggestions) {
        useSuggestions = customSuggestions;
    }

    if (useSuggestions.hasOwnProperty(productID)) {
        return useSuggestions[productID];
    }
    return [];
}

const HMatcher = {
    getSuggestions
};

export default HMatcher;