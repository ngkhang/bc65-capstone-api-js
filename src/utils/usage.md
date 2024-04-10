# Usage for constant and helpers function

## `constant.js` file

- Selectors: `SELECTORS`
- Properties of Product object: `PROPS_PRODUCT`
-Error field of Product: `ERROR_FIELDS_PRODUCT`
- Pattern regex: `REGEXS`

## `helper.js` file

- Get elements by selectors param
  `getElements(selectors)`
- Function to display error message by DOM ID
  `displayErrorMessage(idError, messError)`
- Create a template for a product card
  `getTemplateCard(item)`
- Render data as HTML using a specified template function
  `render(data, selector, callback)`
- Convert string to slug
  `convertToSlug(str)`
- Filter data by a specific key and target value
  `findDataByKey(data, options)`
