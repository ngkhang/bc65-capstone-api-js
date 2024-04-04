// Define token, base URL and endpoint
const TOKEN = '65faf78814650eb21008ea55';
const BASE_URL = `https://${TOKEN}.mockapi.io/api/v1`;

// List endpoint
const END_POINT = {
  PRODUCT: 'products',
};

// List of actions
const ACTIONS = {
  GET_LIST_PRODUCTS: 'GET_LIST_PRODUCTS',
  GET_PRODUCT: 'GET_PRODUCT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

/**
 * Define a function to create custom Axios requests based on action types
 * @return {Funtion} Async function to execute API actions
 */
function customAxios() {
  return async (action, idProduct, data) => {
    let options;
    switch (action) {
      // Get a list of products
      case ACTIONS.GET_LIST_PRODUCTS:
        options = {
          url: `${BASE_URL}/${END_POINT.PRODUCT}`,
          method: 'GET',
        };
        break;

      // Get a product by ID
      case ACTIONS.GET_PRODUCT:
        options = {
          url: `${BASE_URL}/${END_POINT.PRODUCT}/${idProduct}`,
          method: 'GET',
        };
        break;

      // Create a new product
      case ACTIONS.CREATE_PRODUCT:
        options = {
          url: `${BASE_URL}/${END_POINT.PRODUCT}`,
          method: 'POST',
          data,
        };
        break;

      // Update a product
      case ACTIONS.UPDATE_PRODUCT:
        options = {
          url: `${BASE_URL}/${END_POINT.PRODUCT}/${idProduct}`,
          method: 'PUT',
          data,
        };
        break;

      // Delete a product
      case ACTIONS.DELETE_PRODUCT:
        options = {
          url: `${BASE_URL}/${END_POINT.PRODUCT}/${idProduct}`,
          method: 'DEL',
        };
        break;

      default:
        throw new Error('Invalid action type');
    }

    let res = await axios(options);
    return res.data;
  };
}

const connectAPI = customAxios();

const api = {
  /**
   * Get a list of products
   * @return {Arrays<Object>}
   */
  getProducts: () => connectAPI(ACTIONS.GET_LIST_PRODUCTS, null, null),

  /**
   * Get a product by ID
   * @param {number} idProduct - ID of products
   * @return {Object} Product object
   */
  getProductByID: (idProduct) => connectAPI(ACTIONS.GET_PRODUCT, idProduct),

  /**
   * Create a new product
   * @param {Object} data - Product constructor
   */
  createProduct: (data) => connectAPI(ACTIONS.CREATE_PRODUCT, null, data),

  /**
   * Update a product
   * @param {number} idProduct - ID of Product
   * @param {Object} data - Product constructor
   */
  updateProduct: (idProduct, data) =>
    connectAPI(ACTIONS.UPDATE_PRODUCT, idProduct, data),

  /**
   * Delete a product
   * @param {number} idProduct - ID of Product
   */
  deleteProduct: (idProduct) =>
    connectAPI(ACTIONS.DELETE_PRODUCT, idProduct, null),
};

// Example usage: Get a products by ID
// api
//   .getProductByID(1)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.messenge));
