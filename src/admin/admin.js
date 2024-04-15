// let DSSP = [];

function fetchProductList() {
  productServ
    .getProduct()
    .then(function (response) {
      rendersanPhamList(response.data);

      return;
    })
    .catch(function () {});
}

fetchProductList();

//disable btn
function handleBtn(id, status) {
  document.querySelector(id).disabled = status;
}

//trả btn của modal về trang able khi đóng modal
$('#myModal').on('hidden.bs.modal', function () {
  // do something...
  handleBtn('#handleAddNewProduct', false);
  handleBtn('#updateProduct', false);
});

//check khi click btn thêm thì disable btn update
document.querySelector('#btnThemSP').onclick = function () {
  handleBtn('#updateProduct', true);
};

// Nhấn nút thì thêm sp
function handleAddNewProduct() {
  // 1. lấy thông tin từ form
  let newproduct = layThongTinTuForm();

  // 2. Validation input
  //ID
  // var isValid =
  //   kiemTraRong(newproduct.id, '#spanID', 'ID không được để trống') &&
  //   kiemTraSo(newproduct.id, '#spanID', 'ID chỉ được nhập số') &&
  //   kiemTraTrung(newproduct.id, DSSP, '#spanID', 'ID đã tồn tại');

  //NAME
  var isValid = kiemTraRong(
    newproduct.name,
    '#spanName',
    'Tên sản phẩm không được để trống'
  );

  //PRICE
  isValid &=
    kiemTraSo(
      newproduct.price,
      '#spanPrice',
      'Giá sản phẩm chỉ được nhập số'
    ) &&
    kiemTraRong(
      newproduct.price,
      '#spanPrice',
      'Giá sản phẩm không được để trống'
    );

  //SCREEN
  isValid &= kiemTraRong(
    newproduct.screen,
    '#spanScreen',
    'Thông tin màn hình không được để trống'
  );

  //FRONT CAMERA
  isValid &= kiemTraRong(
    newproduct.frontCamera,
    '#spanFrontCamera',
    'Thông tin camera trước không được để trống'
  );

  //BACK CAMERA
  isValid &= kiemTraRong(
    newproduct.backCamera,
    '#spanBackCamera',
    'Thông tin camera sau không được để trống'
  );

  //IMG
  isValid &= kiemTraRong(newproduct.img, '#spanImg', 'Ảnh không được để trống');

  //DESC
  isValid &= kiemTraRong(
    newproduct.desc,
    '#spanDesc',
    'Mô tả không được để trống'
  );

  if (isValid) {
    productServ
      .addProduct(newproduct)
      .then(() => fetchProductList())
      .then(() => {
        $('#myModal').modal('hide');
        resetForm();
      })
      .catch(function () {});
  }
  // if (isValid) {
  //   productServ
  //     .addProduct(newproduct)
  //     .then(() => {
  //       DSSP.push(newproduct);
  //       fetchProductList();
  //       $('#myModal').modal('hide');
  //       resetForm();
  //     })

  //     .catch(function () {});
  // }
}

//delete
function delSanPham(id) {
  productServ
    .delProductByID(id)
    .then(function () {
      fetchProductList();
    })
    .catch(function () {});
}

//edit
function editSanPham(id) {
  productServ
    .getProductByID(id)
    .then(function (response) {
      const newproduct = response.data;

      // hiển thị thông sp cần sửa lên modal
      document.querySelector('#id').value = newproduct.id;
      document.querySelector('#name').value = newproduct.name;
      document.querySelector('#price').value = newproduct.price;
      document.querySelector('#screen').value = newproduct.screen;
      document.querySelector('#frontCamera').value = newproduct.frontCamera;
      document.querySelector('#backCamera').value = newproduct.backCamera;
      document.querySelector('#img').value = newproduct.img;
      document.querySelector('#desc').value = newproduct.desc;

      let typeSelect = document.querySelector('#type');
      for (let option of typeSelect.options) {
        if (option.value === newproduct.type) {
          option.selected = true;
          break;
        }
      }

      // disable btn
      handleBtn('#handleAddNewProduct', true);
      handleBtn('#updateProduct', false);
      // mở modal
      $('#myModal').modal('show');
    })
    .catch(function () {});
}

function updateProduct() {
  let newproduct = layThongTinTuForm();

  //NAME
  var isValid = kiemTraRong(
    newproduct.name,
    '#spanName',
    'Tên sản phẩm không được để trống'
  );

  //PRICE
  isValid &=
    kiemTraSo(
      newproduct.price,
      '#spanPrice',
      'Giá sản phẩm chỉ được nhập số'
    ) &&
    kiemTraRong(
      newproduct.price,
      '#spanPrice',
      'Giá sản phẩm không được để trống'
    );

  //SCREEN
  isValid &= kiemTraRong(
    newproduct.screen,
    '#spanScreen',
    'Thông tin màn hình không được để trống'
  );

  //FRONT CAMERA
  isValid &= kiemTraRong(
    newproduct.frontCamera,
    '#spanFrontCamera',
    'Thông tin camera trước không được để trống'
  );

  //BACK CAMERA
  isValid &= kiemTraRong(
    newproduct.backCamera,
    '#spanBackCamera',
    'Thông tin camera sau không được để trống'
  );

  //IMG
  isValid &= kiemTraRong(newproduct.img, '#spanImg', 'Ảnh không được để trống');

  //DESC
  isValid &= kiemTraRong(
    newproduct.desc,
    '#spanDesc',
    'Mô tả không được để trống'
  );
  if (isValid) {
    productServ
      .updateProductByID(newproduct.id, newproduct)
      .then(() => fetchProductList())
      .then(() => {
        $('#myModal').modal('hide');
        resetForm();
      })
      .catch(function () {});
  }
  // if (isValid) {
  //   productServ
  //     .updateProductByID(newproduct.id, newproduct)
  //     .then(() => {
  //       DSSP.push(newproduct);
  //       fetchProductList();
  //       $('#myModal').modal('hide');
  //       resetForm();
  //     })

  //     .catch(function () {});
  // }
}

//tìm kiếm theo tên
function searchProductByName() {
  // var name = document.querySelector('#txtSearch').value.trim().toLowerCase();
  var name = document.querySelector('#txtSearch').value;
  productServ
    .getProduct()
    .then(function (response) {
      var productList = response.data;

      // tìm kiếm tên người dùng nhập
      // var result = productList.filter(function (newproduct) {
      //   return newproduct.name.toLowerCase().includes(name);
      // });
      let options = {
        key: 'name',
        target: name,
      };
      var result = findDataByKey(productList, options);
      // render lại kết quả tìm thấy
      rendersanPhamList(result);
    })
    .catch(function () {});
}

// tìm kiếm bằng sự kiện nhấn enter
document
  .querySelector('#txtSearch')
  .addEventListener('keydown', function (event) {
    // event là 1 object chứa thông tin về sự kiện
    // event.target: trả ra element phát sinh ra sự kiện
    // event.key: trả ra phím vừa mới nhấn

    //code sẽ chạy khi cứ nhập chữ, đây là cài nếu nhất enter sẽ dừng luôn
    //nhớ cài thêm param trong phần productServ-getProduct
    if (event.key !== 'Enter') return;

    var name = document.querySelector('#txtSearch').value;
    productServ
      .getProduct()
      .then(function (response) {
        var productList = response.data;

        // tìm kiếm tên người dùng nhập
        // var result = productList.filter(function (newproduct) {
        //   return newproduct.name.toLowerCase().includes(name);
        // });
        let options = {
          key: 'name',
          target: name,
        };
        var result = findDataByKey(productList, options);
        // render lại kết quả tìm thấy
        rendersanPhamList(result);
      })
      .catch(function (err) {
        console.log('err', err);
      });
  });

//sắp xếp
//thêm sự kiện cho button - sắp xếp
// Thêm sự kiện cho button sắp xếp từ bé đến lớn
document
  .getElementById('btnSapXepTuBeDenLon')
  .addEventListener('click', function () {
    sortAndRenderProductList(true); // Truyền tham số true để sắp xếp từ bé đến lớn
  });

// Thêm sự kiện cho button sắp xếp từ lớn đến bé
document
  .getElementById('btnSapXepTuLonDenBe')
  .addEventListener('click', function () {
    sortAndRenderProductList(false); // Truyền tham số false để sắp xếp từ lớn đến bé
  });

// Hàm sắp xếp giá sản phẩm từ nhỏ đến lớn
function sapXepTuBeDenLon(products) {
  return products.sort((a, b) => a.price - b.price);
}

// Hàm sắp xếp giá sản phẩm từ lớn đến nhỏ
function sapXepTuLonDenBe(products) {
  return products.sort((a, b) => b.price - a.price);
}

// Hàm render lại bảng sản phẩm sau khi sắp xếp
function renderLaiSauKhiSapXep(danhSachSapXep) {
  var tbody = document.getElementById('tbodySanPham');
  tbody.innerHTML = '';

  danhSachSapXep.forEach(function (newproduct) {
    var row = `<tr>
            <td class="centered-text">${newproduct.id}</td>
            <td class="centered-text">${newproduct.type}</td>
            <td class="centered-text">${newproduct.name}</td>
            <td class="centered-text">${newproduct.price}</td>
            <td class="centered-text">${newproduct.screen}</td>
            <td class="centered-text">${newproduct.backCamera}</td>
            <td class="centered-text">${newproduct.frontCamera}</td>
            <td class="centered-text"><img src="${newproduct.img}" alt="" style="width:130px"/></td>
            <td class="centered-text">${newproduct.desc}</td>
            <td>
              <button class="btn btn-warning" onclick="editSanPham('${newproduct.id}')">Edit</button>
              <button class="btn btn-danger mt-3" onclick="delSanPham('${newproduct.id}')">Del</button>
          </td>
        </tr>`;
    tbody.innerHTML += row;
  });
  var rows = tbody.querySelectorAll('tr');
  rows.forEach((row) => {
    var cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      cell.style.textAlign = 'center';
      cell.style.verticalAlign = 'middle';
    });
  });
}

// Sắp xếp và render lại bảng sản phẩm theo giá khi click vào button
function sortAndRenderProductList(isAscending) {
  productServ
    .getProduct()
    .then(function (response) {
      var productList = response.data;
      var sortedProductList = isAscending
        ? sapXepTuBeDenLon(productList)
        : sapXepTuLonDenBe(productList);
      renderLaiSauKhiSapXep(sortedProductList);
    })
    .catch(function () {});
}
