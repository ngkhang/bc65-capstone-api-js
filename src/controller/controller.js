function layThongTinTuForm() {
  var id = getEle('#txtAddMaSanPham').value;
  var tenSP = getEle('#txtAddTenSanPham').value;
  var type = getEle('#txtAddLoaiSanPham').value;
  var giaSP = +getEle('#txtAddGiaSanPham').value;
  var screen = getEle('#txtAddScreen').value;
  var backCamera = getEle('#txtAddBackCamera').value;
  var frontCamera = +getEle('#txtAddFrontCamera').value;
  var img = getEle('#txtAddImgSanPham').value;
  var desc = getEle('#txtAddMoTa').value;

  var sanPham = new SanPham(
    id,
    tenSP,
    type,
    giaSP,
    screen,
    backCamera,
    frontCamera,
    img,
    desc
  );
  return sanPham;
}

function rendersanPhamList(danhSachSP) {
  var content = '';
  for (var i = 0; i < danhSachSP.length; i++) {
    var sanPham = danhSachSP[i];

    var contentTr = `
          <tr>
              <td>${sanPham.id}</td>
              <td>${sanPham.name}</td>
              <td>${sanPham.price}</td>
              <td><img src="${sanPham.image}" alt="" style="width: 200px" /></td>
              <td>${sanPham.description}</td>
              <td>
                  <button class="btn btn-warning" onclick="editSanPham('${sanPham.id}')" >Edit</button>
                  <button class="btn btn-danger" onclick="delSanPham('${sanPham.id}')">Del</button>
              </td>
          </tr>
      `;

    content += contentTr;
  }
  document.querySelector('#tbodySanPham').innerHTML = content;
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

function onLoading() {
  document.querySelector('#spinner').style.display = 'flex';
}

function offLoading() {
  document.querySelector('#spinner').style.display = 'none';
}
