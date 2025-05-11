import * as yup from 'yup';

import { MAX_PRODUCT_IN_CATEGORY_HOT, MIN_LEN_PASSWORD } from 'constants/custom';

export const LOGIN_SCHEMA = {
  PHONE: 'phone',
  PASSWORD: 'password',
  REMEMBER: 'remember'
};

export const loginSchema = () =>
  yup.object().shape({
    [LOGIN_SCHEMA.PHONE]: yup.string().trim().required().label('Tài khoản'),
    [LOGIN_SCHEMA.PASSWORD]: yup
      .string()
      .required()
      .trim()
      .min(MIN_LEN_PASSWORD, 'Có ít nhất 8 ký tự')
      // .matches(REGEX.PASSWORD, 'Phải có 1 chữ hoa, 1 chữ thường và 1 số')
      .label('Mật khẩu')
  });

export const CATEGORY_DETAIL_SCHEMA = {
  NAME: 'name'
};

export const categoryDetailSchema = () =>
  yup.object().shape({
    [CATEGORY_DETAIL_SCHEMA.NAME]: yup.string().trim().required().label('Tên loại')
  });

export const PRODUCTION_DETAIL_SCHEMA = {
  FILES: 'files',
  CATEGORY_ID: 'categoryId',
  NAME: 'name',
  PRICE: 'price',
  INVENTORY_COUNT: 'inventoryCount',
  DETAIL: 'detail',
  PROMOTION_ID: 'promotionId',
  DESCRIPTION: 'description'
};

export const productDetailSchema = () =>
  yup.object().shape({
    [PRODUCTION_DETAIL_SCHEMA.CATEGORY_ID]: yup.number().required().label('Loại sản phẩm'),
    [PRODUCTION_DETAIL_SCHEMA.NAME]: yup.string().trim().required().label('Tên sản phẩm'),
    [PRODUCTION_DETAIL_SCHEMA.PRICE]: yup.number().required().label('Giá'),
    [PRODUCTION_DETAIL_SCHEMA.INVENTORY_COUNT]: yup.number().label('Số lượng tồn'),
    [PRODUCTION_DETAIL_SCHEMA.DETAIL]: yup.string().trim().label('Chi tiết'),
    [PRODUCTION_DETAIL_SCHEMA.DESCRIPTION]: yup.string().trim().label('Mô tả')
  });

export const COLOR_SCHEMA = {
  FILES: 'files',
  NAME: 'name'
};

export const colorSchema = () =>
  yup.object().shape({
    [COLOR_SCHEMA.NAME]: yup.string().trim().required().label('Tên màu')
  });

export const SIZE_SCHEMA = {
  FILES: 'files',
  NAME: 'name',
  SIZE_PRICE: 'sizePrice'
};

export const sizeSchema = () =>
  yup.object().shape({
    [SIZE_SCHEMA.NAME]: yup.string().trim().required().label('Tên kích thước')
  });
export const PROMOTION_DETAIL_SCHEMA = {
  ID: 'id',
  NAME: 'name',
  TYPE: 'type',
  STATUS: 'status',
  FROM: 'from',
  TO: 'to',
  MIN_AMOUNT: 'minAmount',
  DISCOUNT: 'discount'
};

export const promotionDetailSchema = () =>
  yup.object().shape({
    [PROMOTION_DETAIL_SCHEMA.NAME]: yup.string().trim().required(),
    [PROMOTION_DETAIL_SCHEMA.TYPE]: yup.string().oneOf(['invoice', 'product']).required(),
    [PROMOTION_DETAIL_SCHEMA.STATUS]: yup.string().oneOf(['active', 'inactive']).required(),
    [PROMOTION_DETAIL_SCHEMA.FROM]: yup.date().required(),
    [PROMOTION_DETAIL_SCHEMA.TO]: yup
      .date()
      .min(yup.ref(PROMOTION_DETAIL_SCHEMA.FROM), 'Ngày kết thúc phải sau ngày bắt đầu')
      .required(),
    [PROMOTION_DETAIL_SCHEMA.MIN_AMOUNT]: yup.number().required().min(0, 'Số tiền tối thiểu phải lớn hơn hoặc bằng 0'),
    [PROMOTION_DETAIL_SCHEMA.DISCOUNT]: yup
      .number()
      .required()
      .min(0, 'Giảm giá phải lớn hơn hoặc bằng 0')
      .max(100, 'Giảm giá không được vượt quá 100')
  });

export const ORDER_SCHEMA = {
  USER_ID: 'userId',
  CUSTOMER_NAME: 'customerName',
  CUSTOMER_PHONE: 'customerPhone',
  CUSTOMER_ADDRESS: 'customerAddress',
  SHIPPING_FEE: 'shippingFee',
  PAYMENT_PAID: 'paymentPaid',
  PAYMENT_METHOD: 'paymentMethod',
  PAYMENT_STATUS: 'paymentStatus'
};

export const orderSchema = () =>
  yup.object().shape({
    [ORDER_SCHEMA.USER_ID]: yup.number().label('Khách hàng'),
    [ORDER_SCHEMA.CUSTOMER_NAME]: yup.string().trim().required().label('Tên khách hàng'),
    [ORDER_SCHEMA.CUSTOMER_PHONE]: yup.string().trim().required().label('Số điện thoại'),
    [ORDER_SCHEMA.CUSTOMER_ADDRESS]: yup.string().trim().required().label('Địa chỉ'),
    [ORDER_SCHEMA.SHIPPING_FEE]: yup.number().required().label('Phí ship'),
    [ORDER_SCHEMA.PAYMENT_PAID]: yup.number().required().label('Thanh toán'),
    [ORDER_SCHEMA.PAYMENT_METHOD]: yup.string().required().label('Phương thức thanh toán'),
    [ORDER_SCHEMA.PAYMENT_STATUS]: yup.string().required().label('Trạng thái thanh toán')
  });

export const ORDER_DETAIL_SCHEMA = {
  PRODUCT_ID: 'productId',
  COLOR_ID: 'colorId',
  SIZE_ID: 'sizeId',
  QUANTITY: 'quantity',
  UNIT_PRICE: 'unitPrice'
};

export const orderDetailSchema = () =>
  yup.object().shape({
    [ORDER_DETAIL_SCHEMA.PRODUCT_ID]: yup.number().required().label('Sản phẩm'),
    [ORDER_DETAIL_SCHEMA.COLOR_ID]: yup.number().required().label('Màu sắc'),
    [ORDER_DETAIL_SCHEMA.SIZE_ID]: yup.number().required().label('Kích thước'),
    [ORDER_DETAIL_SCHEMA.QUANTITY]: yup.number().required().label('Số lượng'),
    [ORDER_DETAIL_SCHEMA.UNIT_PRICE]: yup.number().required().label('Đơn giá')
  });

export const WEB_INFO_SCHEMA = {
  NAME: 'name',
  LOGO: 'logo',
  PHONE: 'phone',
  ADDRESS: 'address',
  ZALO: 'zalo',
  ZALO_LINK: 'zaloLink',
  FACEBOOK: 'facebook',
  FACEBOOK_LINK: 'facebookLink',
  CONTACT: 'contact',
  ABOUT_US: 'aboutUs',
  SHIPPING_POLICY: 'shippingPolicy',
  RETURN_POLICY: 'returnPolicy',
  TERM_OF_SERVICE: 'termOfService'
};

export const webInfoSchema = () =>
  yup.object().shape({
    [WEB_INFO_SCHEMA.NAME]: yup.string().trim().label('Tên cửa hàng'),
    [WEB_INFO_SCHEMA.LOGO]: yup.string().trim().label('Logo'),
    [WEB_INFO_SCHEMA.PHONE]: yup.string().trim().label('Phone'),
    [WEB_INFO_SCHEMA.ADDRESS]: yup.string().trim().label('Địa chỉ'),
    [WEB_INFO_SCHEMA.ZALO]: yup.string().trim().label('Zalo'),
    [WEB_INFO_SCHEMA.ZALO_LINK]: yup.string().trim().label('Zalo link'),
    [WEB_INFO_SCHEMA.FACEBOOK]: yup.string().trim().label('Facebook'),
    [WEB_INFO_SCHEMA.FACEBOOK_LINK]: yup.string().trim().label('Facebook link'),
    [WEB_INFO_SCHEMA.CONTACT]: yup.string().trim().label('Liên hệ'),
    [WEB_INFO_SCHEMA.ABOUT_US]: yup.string().trim().label('Về chúng tôi'),
    [WEB_INFO_SCHEMA.SHIPPING_POLICY]: yup.string().trim().label('Chính sách vận chuyển'),
    [WEB_INFO_SCHEMA.RETURN_POLICY]: yup.string().trim().label('Chính sách đổi trả'),
    [WEB_INFO_SCHEMA.TERM_OF_SERVICE]: yup.string().trim().label('Điều khoản dịch vụ')
  });

export const THEME_SCHEMA = {
  NAME: 'name',
  THEMES: 'themes'
};

export const themeSchema = () =>
  yup.object().shape({
    [THEME_SCHEMA.NAME]: yup.string().trim().required().label('Tên')
    // [THEME_SCHEMA.THEMES]: yup.array().of(yup.string().trim().required().label('Màu sắc'))
  });

export const CATEGORY_FEATURED_SCHEMA = {
  CATEGORY_ID: 'categoryId',
  PRODUCTS: 'products'
};

export const categoryHotSchema = () =>
  yup.object().shape({
    [CATEGORY_FEATURED_SCHEMA.CATEGORY_ID]: yup.number().required().label('Loại'),
    [CATEGORY_FEATURED_SCHEMA.PRODUCTS]: yup
      .array()
      .min(1, 'Chọn ít nhất 1 sản phẩm')
      .max(MAX_PRODUCT_IN_CATEGORY_HOT, 'Chỉ chọn tối đa 5 sản phẩm')
      .label('Sản phẩm')
  });

export const PRODUCT_MODAL_SCHEMA = {
  PRODUCT: 'product'
};

export const productModalSchema = () =>
  yup.object().shape({
    [PRODUCT_MODAL_SCHEMA.PRODUCT]: yup.object().required().label('Sản phẩm')
  });

export const USER_SCHEMA = {
  FILES: 'files',
  FULL_NAME: 'fullName',
  PHONE: 'phone',
  EMAIL: 'email',
  ADDRESS: 'address',
  ROLE_ID: 'roleId',
  STATUS: 'status'
};

export const userSchema = () =>
  yup.object().shape({
    [USER_SCHEMA.FULL_NAME]: yup.string().trim().required().label('Họ và tên'),
    [USER_SCHEMA.PHONE]: yup.string().trim().required().label('Số điện thoại'),
    [USER_SCHEMA.EMAIL]: yup.string().trim().required().label('Email'),
    [USER_SCHEMA.ADDRESS]: yup.string().trim().required().label('Địa chỉ'),
    [USER_SCHEMA.ROLE_ID]: yup.number().required().label('Quyền'),
    [USER_SCHEMA.STATUS]: yup.string().required().label('Trạng thái')
  });

export const CHANGE_PASSWORD_SCHEMA = {
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword'
};

export const changePasswordSchema = () =>
  yup.object().shape({
    [CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD]: yup
      .string()
      .required()
      .trim()
      .min(MIN_LEN_PASSWORD, 'Có ít nhất 8 ký tự')
      // .matches(REGEX.PASSWORD, 'Phải có 1 chữ hoa, 1 chữ thường và 1 số')
      .label('Mật khẩu mới'),
    [CHANGE_PASSWORD_SCHEMA.CONFIRM_PASSWORD]: yup
      .string()
      .required()
      .trim()
      .oneOf([yup.ref(CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD), null], 'Mật khẩu không khớp')
      .label('Nhập lại mật khẩu')
  });
