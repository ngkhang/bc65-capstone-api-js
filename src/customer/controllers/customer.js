// Get total price of list orders
const getTotalPrice = (objMapProd) => {
  return [...objMapProd.values()].reduce(
    (total, item) => (total += item.prod.price * item.quatity),
    0
  );
};

// Handle spinner
const handleSpinner = (selectorSpinner, selectorTarget, isLoading) => {
  if (isLoading) {
    getElements(selectorSpinner)[0].classList.add('d-flex');
    getElements(selectorTarget)[0].classList.add('d-none');
  } else {
    getElements(selectorSpinner)[0].classList.remove('d-flex');
    getElements(selectorTarget)[0].classList.remove('d-none');
  }
};

const setLocalStorageByKey = (key, mapObject) => {
  let convertCartToJSON = JSON.stringify([...mapObject.entries()]);
  localStorage.setItem(key, convertCartToJSON);
};

const getLocalStorageByKey = (key) => {
  const serializedMap = localStorage.getItem(key);
  if (!serializedMap) return false;
  return new Map(JSON.parse(serializedMap));
};

// Cart
let Cart;
if (!getLocalStorageByKey('Cart')) {
  Cart = new Map();
} else {
  Cart = getLocalStorageByKey('Cart');
  getElements(SELECTORS.COUNT_CART)[0].innerHTML = Cart.size;
}

// Render products
window.onload = () => {
  handleSpinner(SELECTORS.SPINNER, SELECTORS.LIST_CARD, true);
  api
    .getProducts()
    .then((data) => {
      handleSpinner(SELECTORS.SPINNER, SELECTORS.LIST_CARD, false);
      render(data, SELECTORS.LIST_CARD, getTemplateCard);
    })
    .catch((err) => console.log(err.messenge));
};

// Searching by product name
getElements(SELECTORS.FORM_SEARCH_BY_NAME)[0].addEventListener(
  'submit',
  (e) => {
    e.preventDefault();
    const inputSearch = getElements(SELECTORS.INPUT_SEARCH)[0];

    let options = {
      key: 'name',
      target: inputSearch.value,
    };

    handleSpinner(SELECTORS.SPINNER, SELECTORS.LIST_CARD, true);
    api
      .getProducts()
      .then((products) => {
        handleSpinner(SELECTORS.SPINNER, SELECTORS.LIST_CARD, false);
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
getElements(SELECTORS.BTN_SEARCH_TYPE)[0].addEventListener(
  'change',
  (event) => {
    // 1. Get product type
    let { id, value } = event.target;
    let options = {
      key: id,
      target: value,
    };
    handleSpinner(SELECTORS.SPINNER, SELECTORS.LIST_CARD, true);
    // 2. Find product by type and re-render UI
    api
      .getProducts()
      .then((prods) => {
        handleSpinner(SELECTORS.SPINNER, SELECTORS.LIST_CARD, false);
        // Find product by type
        let listProduct = findDataByKey(prods, options);

        // Re-render UI
        render(listProduct, SELECTORS.LIST_CARD, getTemplateCard);
      })
      .catch((err) => console.log(err));
  }
);

// Add product to Cart
const handleAddProduct = (selectInput, prodURI) => {
  let prod = processProductURI(prodURI, 'decode');
  let quatity = getElements(selectInput)[0].value * 1;
  if (quatity <= 0) {
    // TODO: Create Toasts
    alert('Số lượng trống');
    return;
  }

  const item = {
    prod,
    quatity:
      Cart.has(prod.id) === false
        ? quatity
        : Cart.get(prod.id).quatity + quatity,
  };
  getElements(selectInput)[0].value = 1;
  Cart.set(prod.id, item);

  setLocalStorageByKey('Cart', Cart);

  getElements(SELECTORS.COUNT_CART)[0].innerHTML = Cart.size;
  getTemplateProcessPayment([...Cart.values()]);
};

// Handle Button Up/Down quatity
const handleUpDownCount = (
  selectInput,
  action,
  min = 0,
  objProd = undefined
) => {
  let quatityCurrent = getElements(selectInput)[0].value * 1;

  if (action === 'DOWN' && quatityCurrent > min)
    quatityCurrent = quatityCurrent - 1;
  else if (action === 'UP') quatityCurrent = quatityCurrent + 1;

  getElements(selectInput)[0].value = quatityCurrent;

  if (objProd) {
    const prod = processProductURI(objProd, 'decode');
    const item = {
      prod,
      quatity: quatityCurrent,
    };
    Cart.set(prod.id, item);
    getElements('span#totalPrice')[0].innerHTML = getTotalPrice(Cart);
    setLocalStorageByKey('Cart', Cart);
  }
};

// Attach click event listener to the modal
getElements(SELECTORS.BTN_CART)[0].addEventListener('click', () => {
  let sizeCart = Cart.size;
  if (sizeCart) {
    getTemplateProcessPayment([...Cart.values()]);
    $('#myModal').modal('show');
  } else {
    const date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}`;
    getTemplateToast('Giỏ hàng đang trống', time);
    $('#liveToast').toast('show');
  }
});

// Handle Modal Cart
getElements(SELECTORS.BTN_CART)[0].addEventListener('click', () => {
  let sizeCart = Cart.size;
  $('#paymentModal').modal(sizeCart !== 0 ? 'show' : 'hide');
});

// Remove Item
const removeItemCart = (idProduct) => {
  let isDelete = Cart.delete(idProduct);
  if (isDelete) {
    getTemplateProcessPayment([...Cart.values()]);
    let sizeCart = Cart.size;
    let btnCart = getElements(SELECTORS.COUNT_CART)[0];
    btnCart.innerHTML = sizeCart;
    if (!sizeCart) $('#paymentModal').modal('hide');
    setLocalStorageByKey('Cart', Cart);
  }
};

// Clear Cart
const handleClearCart = () => {
  Cart.clear();
  getElements(SELECTORS.COUNT_CART)[0].innerHTML = 0;
  $('#paymentModal').modal('hide');
  localStorage.removeItem('Cart');
};

// Get bill
const handlePurchase = () => {
  let total = getTotalPrice(Cart);
  let orders = [...Cart.values()].map((item) => item.prod);
  const bill = {
    orders,
    total,
  };
  Cart.clear();
  getElements(SELECTORS.COUNT_CART)[0].innerHTML = 0;
  getTemplateSuccessPayment(bill);
  localStorage.removeItem('Cart');
};
