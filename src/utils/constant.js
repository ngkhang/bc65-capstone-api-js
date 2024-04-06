// Properties of Product object
const PROPS_PRODUCT = {
  id: {
    fieldName: 'ID',
    idError: '#tbId',
  },
  name: {
    fieldName: 'Tên sản phẩm',
    idError: '#tbName',
  },
  price: {
    fieldName: 'Giá',
    idError: '#tbPrice',
  },
  screen: {
    fieldName: 'Màn hình',
    idError: '#tbScreen',
  },
  backCamera: {
    fieldName: 'Camera sau',
    idError: '#tbBackCamera',
  },
  frontCamera: {
    fieldName: 'Camera trước',
    idError: '#tbFrontCamera',
  },
  img: {
    fieldName: 'Ảnh',
    idError: '#tbImg',
  },
  desc: {
    fieldName: 'Mô tả',
    idError: '#tbDesc',
  },
  type: {
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
