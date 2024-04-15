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
  isValid &= validateStringInput(prod.name, ERROR_FIELDS_PRODUCT.name);
  // Validate Price
  isValid &= validatePrice(prod.price, ERROR_FIELDS_PRODUCT.price);
  // Validation Screen
  isValid &= validateStringInput(prod.screen, ERROR_FIELDS_PRODUCT.screen);
  // Validation Back Camera
  isValid &= validateStringInput(
    prod.backCamera,
    ERROR_FIELDS_PRODUCT.backCamera
  );
  // Validation Front Camera
  isValid &= validateStringInput(
    prod.frontCamera,
    ERROR_FIELDS_PRODUCT.frontCamera
  );
  // Validation Image
  isValid &= validateStringInput(prod.image, ERROR_FIELDS_PRODUCT.image);
  // Validation Description
  isValid &= validateStringInput(
    prod.description,
    ERROR_FIELDS_PRODUCT.description
  );
  // Validation Type
  isValid &= validateStringInput(prod.type, ERROR_FIELDS_PRODUCT.type);

  return isValid;
};

/*
  Usage:

  let product = {//...};
  let isValid = handleValidate(product);

  if(isVaild) {
    // Handle logic...
  }
*/

//validation khánh hưng
function kiemTraRong(value, idErr, message) {
  if (value.trim() === '') {
    getEle(idErr).innerHTML = message;
    return false;
  } else {
    getEle(idErr).innerHTML = '';
    return true;
  }
}

function kiemTraSo(value, idErr, message) {
  const re = /^[0-9]+$/;

  var isNumber = re.test(value);

  if (isNumber) {
    getEle(idErr).innerHTML = '';
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
}

function kiemTraTrung(id, array, idErr, message) {
  var viTri = array.findIndex(function (sv) {
    return sv.maSV === id;
  });

  if (viTri != -1) {
    getEle(idErr).innerHTML = message;
    return false;
  } else {
    getEle(idErr).innerHTML = '';
    return true;
  }
}

function kiemTraDoDai(value, idErr, min, max, message) {
  var length = value.length;
  if (length >= min && length <= max) {
    getEle(idErr).innerHTML = '';
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    return false;
  }
}
