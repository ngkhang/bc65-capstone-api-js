// Render products
window.onload = () => {
  api
    .getProducts()
    .then((data) => render(data, SELECTORS.LIST_CARD, getTemplateCard))
    .catch((err) => console.log(err.messenge));
};
