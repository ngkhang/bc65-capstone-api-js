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

/**
 * Create a template for a product card
 * @param {object} prod - Object representing product data
 * @return {string} - HTML string representing the product card
 */
const getTemplateCard = (prod) => {
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
            <button type="button" class="btn btn--down">
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

            <button type="button" class="btn">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <button
            type="button"
            class="btn btnAdd px-4 px-sm-0 flex-sm-grow-1 px-xl-4"
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

/**
 * Render data as HTML using a specified template function
 * @param {array} data - Array of objects representing product data
 * @param {string} selector - CSS selector of the element where the HTML will be rendered
 * @param {function} callback - Template function to generate HTML for each item
 */
const render = (data, selector, callback) => {
  const outputElement = getElements(selector)[0];

  let content = data.map((item) => callback(item));
  outputElement.innerHTML = content.join('');
};

/**
 * Convert string to slug
 * @param {string} str
 * @return string - string have slug format
 */
const convertToSlug = (str) => {
  let slug = '';

  //Đổi chữ hoa thành chữ thường
  slug = str.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\|_/gi,
    ''
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-');
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');

  return slug;
};

/**
 
Filter data by a specific key and target value
@param {array} data - Array of objects to search
@param {object} options - Options object containing 'target' and 'key' properties
@param {string} options.key - Key name to search for the target value
@param {string} options.target - Target value to search for
@returns {array} - Array of objects matching the target value in the specified key
*/
const findDataByKey = (data, options) => {
  const { key, target } = options;
  let targetConvert = convertToSlug(target).replaceAll('-', '');

  return data.filter((item) => {
    if (!item.hasOwnProperty(key)) return false;
    const valueConvert = convertToSlug(item[key]).replaceAll('-', '');

    return valueConvert.includes(targetConvert);
  });
};
