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