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