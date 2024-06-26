// Selectors
const SELECTORS = {
  // Selector common

  // Selector into Admin page
  INPUT_FORM_ADMIN:
    'section#adminPage form input, section#adminPage form select, section#adminPage form textarea',

  // Selector into Customer page
  LIST_CARD: 'section#customerPage div#listCard',
  FORM_SEARCH_BY_NAME: 'section#customerPage form#searchByName',
  FORM_SEARCH_BY_TYPE: 'section#customerPage form#searchByType',
  INPUT_SEARCH: 'section#customerPage form#searchByName input',
  BTN_SEARCH: 'section#customerPage form#searchByName button',
  BTN_SEARCH_TYPE: 'section#customerPage div#searchByType select#type',
  BTN_CART: 'div#btnTriggerPayment',
  COUNT_CART: 'section#payment div#btnTriggerPayment span',
  SPINNER: 'div#spinnerCustomer',
};

// Properties of Product object
const PROPS_PRODUCT = {
  id: 'id',
  name: 'name',
  price: 'price',
  img: 'img',
  screen: 'screen',
  backCamera: 'backCamera',
  frontCamera: 'frontCamera',
  desc: 'desc',
  type: 'type',
};

// Error fields of product
const ERROR_FIELDS_PRODUCT = {
  [PROPS_PRODUCT.id]: {
    fieldName: 'ID',
    idError: '#tbId',
  },
  [PROPS_PRODUCT.name]: {
    fieldName: 'Tên sản phẩm',
    idError: '#tbName',
  },
  [PROPS_PRODUCT.price]: {
    fieldName: 'Giá',
    idError: '#tbPrice',
  },
  [PROPS_PRODUCT.screen]: {
    fieldName: 'Màn hình',
    idError: '#tbScreen',
  },
  [PROPS_PRODUCT.backCamera]: {
    fieldName: 'Camera sau',
    idError: '#tbBackCamera',
  },
  [PROPS_PRODUCT.frontCamera]: {
    fieldName: 'Camera trước',
    idError: '#tbFrontCamera',
  },
  [PROPS_PRODUCT.img]: {
    fieldName: 'Ảnh',
    idError: '#tbImg',
  },
  [PROPS_PRODUCT.desc]: {
    fieldName: 'Mô tả',
    idError: '#tbDesc',
  },
  [PROPS_PRODUCT.type]: {
    fieldName: 'Nhà sản xuất',
    idError: '#tbType',
  },
};

// Pattern regex
const REGEXS = {
  NUMBER: /^[0-9]+$/,
  STRING: /^.+$/,
  URL: /^(ftp|http|https):\/\/[^ "]+$/,
};
