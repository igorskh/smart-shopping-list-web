# Smart Shopping List

ReactJS-based shopping list with basic functionallity, string analysis and fuzzy search of products.

## Features
- Basic functions - add, remove items
- Basic natural language processing for detection of quantities and metrics
- Fuzzy search of products in a database based on Levenshtein distance
- Merging items of the same content
- Animated graphical user interface

## Implementation
### Project Structure
Folder `src/Datasets` contains `json` files with sample data:
  - [quantity_types.json](src/Datasets/quantity_types.json) - set of possible quantity types
  - [products.json](src/Datasets/products.json) - sample set of products

Folder `src/Helpers` contains main logic of the app
  - [HMatcher.js](src/Helpers/HMatcher.js) - implementation of fuzzy search in datasets
  - [HStrings.js](src/Helpers/HStrings.js) - strings manipulations

## Dependancies
### Functionality
  - [react](https://www.npmjs.com/package/react) (base framework)
  - [fuzzball](https://www.npmjs.com/package/fuzzball) (fuzzy search)
  ### Animations
  - [react-pose](https://www.npmjs.com/package/react-pose) (UI animation)
  - [popmotion](https://www.npmjs.com/package/popmotion) (SVG animation)
  - [flubber](https://www.npmjs.com/package/flubber) (SVG animation)
  - [bootstrap](https://www.npmjs.com/package/bootstrap) and [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) (layout)
  - [fontawesome](https://fontawesome.com) and [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) (icons)

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
