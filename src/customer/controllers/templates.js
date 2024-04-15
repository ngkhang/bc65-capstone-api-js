/**
 * Create a template for not found item
 * @param {object}
 * @return {string} - HTML string representing the not found
 */
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

/**
 * Create a template for a product card
 * @param {object} prod - Object representing product data
 * @return {string} - HTML string representing the product card
 */
const getTemplateCard = (prod) => {
  let idProd = prod[PROPS_PRODUCT.id];
  let selectInput = `div#prod-${idProd} input`;
  let encodeURIProduct = processProductURI(prod, 'encode');

  return `
  <div class="col-12 col-sm-6 col-lg-4 mb-4">
    <div class="card h-100"
      id="prod-${prod[PROPS_PRODUCT.id]}"
    >
      <div class="d-flex justify-content-center p-3">
        <img
          class="card-img-top img-fluid w-75"
          src="${prod[PROPS_PRODUCT.img]}"
          alt="${prod[PROPS_PRODUCT.name]}"
        />
      </div>

      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${prod[PROPS_PRODUCT.name]}</h5>
        <div class="mb-4">
          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <h6 class="card-subtitle text-muted mb-2">
              ${prod[PROPS_PRODUCT.type]}
            </h6>
            <span
              class="font-weight-bolder mb-2"
              style="font-size: 20px"
            >
              ${prod[PROPS_PRODUCT.price]}
            </span>
          </div>
          <p class="card-text text-truncate">${prod[PROPS_PRODUCT.desc]}</p>
        </div>

        <div
          class="btn-toolbar justify-content-between"
          role="toolbar"
          aria-label="Toolbar with button groups"
        >
          <div
            class="btn-group flex-grow-0 mr-sm-2 mr-lg-4"
            role="group"
          >
            <button type="button" onclick="handleUpDownCount('${selectInput}','DOWN', 1)" class="btn btn--down">
              <i class="fa-solid fa-minus"></i>
            </button>

            <div class="input-group px-1" style="width: 60px">
              <input
                type="text"
                class="form-control text-center"
                placeholder="1"
                value="1"
              />
            </div>

            <button type="button" onclick="handleUpDownCount('${selectInput}','UP', 1)" class="btn">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <button
            type="button"
            class="btn btnAdd px-4 px-sm-0 flex-sm-grow-1 px-xl-4"
            onclick="handleAddProduct('${selectInput}', '${encodeURIProduct}')"
          >
            <i class="fa-solid fa-cart-plus px-sm-0"></i>
            <span class="d-inline-block d-sm-none d-md-inline-block"> 
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
};

// Template: Process Payment
const getTemplateProcessPayment = (listProd) => {
  const listRow = listProd.map((item, index) => {
    const { prod, quatity } = item;
    const encodeProd = processProductURI(prod, 'encode');
    let selectInput = `tr#prod-${prod.id} input`;
    return `
      <tr id="prod-${prod.id}">
        <td>${index + 1}</td>
        <td class="text-left text-md-center">
          ${prod.name}
        </td>
        <td>${prod.price}</td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              onclick="handleUpDownCount('${selectInput}','DOWN', 1, '${encodeProd}')"
              class="btn-primary btn btn--down"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <div class="input-group px-1">
              <input
                type="text"
                class="form-control text-center"
                placeholder="${quatity}"
                value="${quatity}"
              />
            </div>
            <button
              type="button" 
              onclick="handleUpDownCount('${selectInput}','UP', 1, '${encodeProd}')"class="btn-primary btn"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </td>
        <td clas>
          <button
            type="button"
            class="btn btn-danger"
            onclick="removeItemCart('${prod.id}')"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  const content = `
    <div id="paymentBody" class="modal-body">
      <div class="table-responsive-xl">
        <table class="table text-center">
          <thead>
            <tr> 
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quatity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            ${listRow.join('')}
          </tbody>
        </table>
      </div>
    </div>
  
    <div class="modal-footer d-block">
      <div class="row">
        <div class="col-12 text-right">
          <p class="text-base">
            Total:
            <span id="totalPrice" class="ml-2 text-xl">$${getTotalPrice(
              Cart
            )}</span>
          </p>
        </div>

        <div class="col-12">
          <div
            class="row flex-column align-items-center flex-sm-row justify-content-sm-end"
          >
            <button
              id="purchase"
              onclick = "handlePurchase()"
              type="button"
              class="btn btn-primary col-12 col-sm-5 col-md-4 col-lg-3 mb-2 mb-sm-0 mr-sm-3"
            >
              Purchase
            </button>
            <button
              onclick="handleClearCart()"
              type="button"
              class="btn btn-light col-12 col-sm-5 col-md-4 col-lg-3"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  getElements('div#paymentModal div#paymentContent')[0].innerHTML = content;
};

// Template: Success Payment
const getTemplateSuccessPayment = (bill) => {
  const { orders, total } = bill;
  const listOrder = orders.map((item) => `<li>${item.name}</li>`);

  const content = `
    <div id="paymentBody" class="modal-body">
      <div class="px-md-3 px-lg-4">
        <div class="row">
          <div class="col-12 col-md-5 col-lg-6 mb-5 mb-lg-0">
            <h5 class="mb-3">Information</h5>
            <p class="mb-0">Your order-id is : 196</p>
            <p class="mb-0">Total paymnet : ${total}</p>
            <p class="mb-0">
              Your order will be delivered to you in 3-5 working days
            </p>
          </div> 

          <div div class="col-12 col-md-7 col-lg-6">
            <h5 class="mb-3">List orders</h5>
            <div class="px-3">
              <ul>
                ${listOrder.join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>  
    </div>
  
    <div class="modal-footer d-block">      
      <div class="row justify-content-end">
        <p class="col-12 mb-3 text-center text-sm-right">Thank you</p>
        <button
          type="button"
          class="btn btn-light col-12 col-sm-6 col-md-4"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  `;

  getElements('div#paymentModal div#paymentContent')[0].innerHTML = content;
};

// Template: Toast
const getTemplateToast = (mess, currentTime) => {
  const content = `
    <div
    class="position-fixed bottom-0 right-0 p-2"
    style="z-index: 5; right: 0; bottom: 0"
  >
    <div
      id="liveToast"
      class="toast hide bg-white py-2 px-4"
      style="border: 2px solid var(--pink-3)"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-delay="3000"
    >
      <div class="toast-header p-0 mb-2">
        <i class="fa-solid fa-triangle-exclamation mr-2 text-xl" style="color: var(--pink-2)"></i>
        <strong class="mr-5 text-base" style="color: var(--gray-6)">Cybershope</strong>
        <small class="mr-3">${currentTime}</small>
        <button
          type="button"
          class="mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body text-base">${mess}</div>
    </div>
  </div>
    `;
  getElements('section#toast')[0].innerHTML = content;
};
