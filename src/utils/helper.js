/**
 * Get elements by selectors param
 * @param {string} selectors - CSS selectors for elements
 * @return {NodeList} - array of elements matching the selectors
 */
const getElements = (selectors) => document.querySelectorAll(selectors);

/**
 * Function to display error message by DOM ID
 * @param {string} idError - The ID of the DOM element to display the error message
 * @param {string} messError - The error message to display
 */
const displayErrorMessage = (idError, messError) => {
  const errorElement = getElements(idError)[0];

  if (errorElement) {
    if (messError === '') {
      errorElement.classList.remove('d-inline-block');
    } else {
      errorElement.classList.add('d-inline-block');
      errorElement.innerHTML = messError;
    }
  }
};
