// Render products
window.onload = () => {
  api
    .getProducts()
    .then((data) => render(data, SELECTORS.LIST_CARD, getTemplateCard))
    .catch((err) => console.log(err.messenge));
};

// Not Found Component
const NotFound = ({ title, desc }) => {
  return `
    <div class="col-12 mt-2 mt-md-5 text-center">
      <h4 class="text-4xl mb-3">
        <span class="text-xl font-weight-normal">Keyword: </span>
        ${title}
        </h4>
      <p class="text-2xl">${desc}</p>
    </div>
  `;
};

// Searching by product name
getElements(SELECTORS.FORM_SEARCH_BY_NAME)[0].addEventListener(
  'submit',
  (e) => {
    e.preventDefault();
    const inputSearch = getElements(SELECTORS.INPUT_SEARCH)[0];

    const options = {
      key: 'name',
      target: inputSearch.value,
    };

    api
      .getProducts()
      .then((products) => {
        // Case 1: Input is empty or spacing
        if (options.target.trim() === '') {
          render(products, SELECTORS.LIST_CARD, getTemplateCard);
          return;
        }

        const productSearch = findDataByKey(products, options);

        // Case 2: Find success products
        if (productSearch.length) {
          render(productSearch, SELECTORS.LIST_CARD, getTemplateCard);
          return;
        }

        // Case 3: Not found product
        const contentNotFound = {
          title: options.target,
          desc: "Sorry, we couldn't find any results for your keyword",
        };
        getElements(SELECTORS.LIST_CARD)[0].innerHTML =
          NotFound(contentNotFound);

        // Clear form
        inputSearch.blur();
        inputSearch.value = '';
      })
      .catch((err) => console.log(err));
  }
);

// Searching by product type (dropdown)
getElements(SELECTORS.BTN_SEARCH_TYPE)[0].addEventListener('change', (event) => {
  // 1. Get product type
  let { id, value } = event.target;
  let options = {
    key: id,
    target: value,
  }
  // 2. Find product by type and re-render UI
  api
    .getProducts()
    .then((prods) => {
      // Find product by type
      let listProduct = findDataByKey(prods, options);

      // Re-render UI
      render(listProduct, SELECTORS.LIST_CARD, getTemplateCard);
    })
    .catch((err) => console.log(err))
})
