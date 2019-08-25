# Smart Shopping List

[![CircleCI](https://circleci.com/gh/igorskh/smart-shopping-list-web.svg?style=svg&circle-token=61cc396e40bd730a79ab0cb9246d2a3796270103)](https://circleci.com/gh/igorskh/smart-shopping-list-web)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/25f4d23c587a4274bf97bbd7666a4e0c)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=igorskh/smart-shopping-list-web&utm_campaign=Badge_Grade)

ReactJS-based shopping list with basic functionallity, string analysis and fuzzy search of products. Check out a [live demo](https://inez.roundeasy.now.sh).

## Features

-   Basic functions - add, remove items
-   Basic natural language processing for detection of quantities and metrics
-   Fuzzy search of products in a database based on Levenshtein distance
-   Merging items of the same content
-   Animated graphical user interface

## Implementation

### Project Structure

Folder `src/Datasets` contains `json` files with sample data:

-   [quantity_types.json](src/Datasets/quantity_types.json) - set of possible quantity types
-   [products.json](src/Datasets/products.json) - sample set of products

Folder `src/Helpers` contains main logic of the app

-   [HMatcher.js](src/Helpers/HMatcher.js) - implementation of fuzzy search in datasets
-   [HStrings.js](src/Helpers/HStrings.js) - strings manipulations

### Language Processing

When user types anything in the input field in [Components/AddProductForm.js](src/Components/AddProductForm.js), the following process runs:
1. Detect qunitites such as `1kg`, `1 liter`, etc. using a regular expression. Split number from a word, such as `1kg` to `1` and `kg`. 
2. Search word in a database using fuzzy search. If the word exsits in the list of metrics, use it as an quantity type.
3. Remove quanitity from the string, such as `1 liter of cold sweet milk` becomes `of cold sweet milk`
4. Remove typical prepositions (of, for): `cold sweet milk`
5. Search string in a database using fuzzy search, first all words, then removing first word and so on, `cold sweet milk` => `sweet milk` => `milk`. Until string is found in a database.
6. Repeat procedure with a reversed string `milk sweet cold` => `sweet cold` => `cold`
7. Use part which is found in a database as a product name `milk` and the rest as a description `cold sweet`

## Dependancies

### Functionality

-   [react](https://www.npmjs.com/package/react) (base framework)
-   [fuzzball](https://www.npmjs.com/package/fuzzball) (fuzzy search)

### UI and Animations

-   [react-pose](https://www.npmjs.com/package/react-pose) (UI animation)
-   [popmotion](https://www.npmjs.com/package/popmotion) (SVG animation)
-   [flubber](https://www.npmjs.com/package/flubber) (SVG animation)
-   [bootstrap](https://www.npmjs.com/package/bootstrap) and [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) (layout)
-   [fontawesome](https://fontawesome.com) and [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) (icons)

## Installation

All dependancies are managed by npm:

```bash
npm install
```

Run locally:

```bash
npm run
```

Build for production:

```bash
npm run build
```
