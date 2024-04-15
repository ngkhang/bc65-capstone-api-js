function layThongTinTuForm() {
  let product = new SanPham();

  let inputs = getElements(SELECTORS.INPUT_FORM_ADMIN);
  inputs.forEach((input) => {
    let id = input.id;
    let value = id === price ? input.value * 1 : input.value;

    product[id] = value;
  });
  return product;
}

function rendersanPhamList(danhSachSP) {
  var content = '';
  for (var i = 0; i < danhSachSP.length; i++) {
    var sanPham = danhSachSP[i];

    var contentTr = `
          <tr>
          <td>${sanPham.id}</td>
          <td>${sanPham.type}</td>
          <td>${sanPham.name}</td>
          <td>${sanPham.price}</td>
          <td>${sanPham.screen}</td>
          <td>${sanPham.backCamera} <br> ${sanPham.frontCamera}</td>
          
          <td><img src="${sanPham.img}" alt="" class="img-fluid"/></td>
          <td>${sanPham.desc}</td>
          <td>
              <button class="btn btn-warning" onclick="editSanPham('${sanPham.id}')">Edit</button>
              <button class="btn btn-danger mt-3" onclick="delSanPham('${sanPham.id}')">Del</button>
          </td>
      </tr>
      `;

    content += contentTr;
  }
  var tbody = document.querySelector('#tbodySanPham');
  tbody.innerHTML = content;

  // Căn giữa các ô trong từng hàng của bảng
  var rows = tbody.querySelectorAll('tr');
  rows.forEach((row) => {
    var cells = row.querySelectorAll('td');
    cells.forEach((cell) => {
      cell.style.textAlign = 'center';
      cell.style.verticalAlign = 'middle';
    });
  });
}

function resetForm() {
  document.querySelector('#txtAddMaSanPham').value = '';
  document.querySelector('#txtAddTenSanPham').value = '';
  document.querySelector('#txtAddLoaiSanPham').value = '';
  document.querySelector('#txtAddGiaSanPham').value = '';
  document.querySelector('#txtAddScreen').value = '';
  document.querySelector('#txtAddBackCamera').value = '';
  document.querySelector('#txtAddFrontCamera').value = '';
  document.querySelector('#txtAddImgSanPham').value = '';
  document.querySelector('#txtAddMoTa').value = '';
}
