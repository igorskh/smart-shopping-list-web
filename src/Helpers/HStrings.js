
function removeExtraWhitespaces(val) {
    return val.replace(/\s+/g, " ");
}

function sliceJoin(arr, start, end) {
    return arr.slice(start, end).join(" ");
}


function substringParts(val, start, end) {
    return `${val.substring(0, start)}${val.substring(end, val.length)}`;
}

function removePrepositions(words) {
    const stopWords = ["of", "von", "for"];
    return words.filter(word => !stopWords.includes(word)).join(" ");
}

const HStrings = {
    removeExtraWhitespaces,
    sliceJoin,
    substringParts,
    removePrepositions
};

export default HStrings;