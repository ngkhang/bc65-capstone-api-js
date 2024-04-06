/**
 * Function to check if a field is empty and display an error message if it is
 * @param {string} input - The input string to be validated
 * @param {string} fieldName - The name of the field being validated (for error message)
 * @param {string} idError - The ID of the DOM element to display the error message
 * @return {boolean} - Returns true if the field is not empty, false otherwise
 */
const isEmpty = (input, fieldName, idError) => {
  let status = true;
  let content = '';

  if (!input || input.trim() === '') {
    content = `${fieldName} không được để trống`;
    status = false;
  }

  displayErrorMessage(idError, content);
  return status;
};

/**
 * Function to validate if a string is an integer and display an error message by DOM ID
 * @param {string} input - The input string to be validated
 * @param {string} fieldName - The name of the field being validated (for error message)
 * @param {string} idError - The ID of the DOM element to display the error message
 * @return {boolean} - Returns true if the input is a number, false otherwise
 */
const isNumber = (input, fieldName, idError) => {
  let status = true;
  let content = '';

  if (!REGEXS.NUMBER.test(input.trim())) {
    content = `${fieldName} phải là chữ số`;
    status = false;
  }
  displayErrorMessage(idError, content);
  return status;
};

/**
 * Function to validate if an input is a string and display an error message by DOM ID
 * @param {string} input - The input string to be validated
 * @param {string} fieldName - The name of the field being validated (for error message)
 * @param {string} idError - The ID of the DOM element to display the error message
 * @return {boolean} - Returns true if the input is a number, false otherwise
 */
const isString = (input, fieldName, idError) => {
  let status = true;
  let content = '';

  if (!REGEXS.STRING.test(input.trim())) {
    content = `${fieldName} phải là chữ`;
    status = false;
  }
  displayErrorMessage(idError, content);
  return status;
};

// Validation product about: name, screen, backCamera, frontCamera, image, description, type
const validateStringInput = (input, { fieldName, idError }) => {
  return (
    isEmpty(input, fieldName, idError) && isString(string, fieldName, idError)
  );
};

// Validation product price
const validatePrice = (price, { fieldName, idError }) => {
  return (
    isEmpty(price, fieldName, idError) && isNumber(price, fieldName, idError)
  );
};

/**
 * Validates product data.
 * @param {object} prod - The product data to validate.
 * @returns {boolean} - Returns true if all inputs are valid, false otherwise.
 */
const handleValidate = (prod) => {
  let isValid = true;

  // Validate Name
  isValid &= validateStringInput(prod.name, PROPS_PRODUCT.name);
  // Validate Price
  isValid &= validatePrice(prod.price, PROPS_PRODUCT.price);
  // Validation Screen
  isValid &= validateStringInput(prod.screen, PROPS_PRODUCT.screen);
  // Validation Back Camera
  isValid &= validateStringInput(prod.backCamera, PROPS_PRODUCT.backCamera);
  // Validation Front Camera
  isValid &= validateStringInput(prod.frontCamera, PROPS_PRODUCT.frontCamera);
  // Validation Image
  isValid &= validateStringInput(prod.image, PROPS_PRODUCT.image);
  // Validation Description
  isValid &= validateStringInput(prod.description, PROPS_PRODUCT.description);
  // Validation Type
  isValid &= validateStringInput(prod.type, PROPS_PRODUCT.type);

  return isValid;
};
