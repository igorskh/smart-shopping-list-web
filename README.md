# Smart Shopping List

[![CircleCI](https://circleci.com/gh/igorskh/smart-shopping-list-web.svg?style=svg&circle-token=61cc396e40bd730a79ab0cb9246d2a3796270103)](https://circleci.com/gh/igorskh/smart-shopping-list-web)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/25f4d23c587a4274bf97bbd7666a4e0c)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=igorskh/smart-shopping-list-web&utm_campaign=Badge_Grade)

ReactJS-based shopping list with basic functionallity, string analysis and fuzzy search of products. Check out a [live demo](https://inez.roundeasy.now.sh).

If you have not received this project by clonining from git, check out the [repository](https://github.com/igorskh/smart-shopping-list-web).

## Features

-   Basic functions - add, remove items, change quantity
-   Basic natural language processing for detection of quantities and metrics
-   Fuzzy search of products in a database based on Levenshtein distance
-   Merging items of the same content
-   Animated graphical user interface
-   Save/Restore items to/from the browser local storage

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

### Synonyms Search

Each entity, quantity type of a product has fields `ref` and `refType`.

```json
    "kartoffel": {
        "ref": "potatoes",
        "refType": "synonym"
    },
    "potatoes": {
        "title": "🥔Potatoes",
        "defaultMetric": "kilogram",
        "defaultQuantity": 1
    },
```

If product, for example `kartoffel` has `refType` = `synonym`, synonym search method will take all properties from the product specified in `ref`. This process repeats reccursively until `refType`, `ref` is missing or `refType` != `synonym`.

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

Project can be deployed on [Zeit.co](https://zeit.co). Just use [CLI utility](https://github.com/zeit/now-cli) and run `now` to deploy.

## Copyright and License

Copyright 2019 Igor Kim

This project is licensed under GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

[What does it mean?](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)#summary)
