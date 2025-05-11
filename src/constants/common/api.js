export const API_ROOT = process.env.NEXT_PUBLIC_HOST;
export const ROOT_URL = process.env.NEXT_PUBLIC_WEB_URL;

export const TIME_OUT = 10000;

export const API = {
  AUTH: {
    LOGIN: 'admin/auth/login'
  },
  UPLOAD: {
    SINGLE: 'admin/upload',
    MULTIPLE: 'admin/upload/multiple'
  },
  PRODUCT: {
    LIST: 'admin/product',
    DETAIL: 'admin/product/:id',
    NEW: 'admin/product'
  },
  PRODUCT_FEATURED: {
    LIST: 'admin/product-featured',
    DETAIL: 'admin/product-featured/:id',
    NEW: 'admin/product-featured'
  },
  CATEGORY: {
    LIST: 'admin/category',
    DETAIL: 'admin/category/:id',
    NEW: 'admin/category'
  },
  CATEGORY_FEATURED: {
    LIST: 'admin/category-featured',
    DETAIL: 'admin/category-featured/:id',
    NEW: 'admin/category-featured'
  },
  COLOR: {
    LIST: 'admin/color',
    DETAIL: 'admin/color/:id',
    NEW: 'admin/color'
  },
  SIZE: {
    LIST: 'admin/size',
    DETAIL: 'admin/size/:id',
    NEW: 'admin/size'
  },
  PROMOTION: {
    LIST: 'admin/promotion',
    DETAIL: 'admin/promotion/:id',
    NEW: 'admin/promotion'
  },
  ORDER: {
    LIST: 'admin/order',
    DETAIL: 'admin/order/:id',
    NEW: 'admin/order',
    TOTAL_PRICE: 'admin/order/:id/total_price'
  },
  ORDER_PRODUCT: {
    LIST: 'admin/order/:id/products',
    DETAIL: 'admin/order/:id/product',
    NEW: 'admin/order/:id/product'
  },
  USER: {
    LIST: 'admin/user',
    DETAIL: 'admin/user/:id',
    NEW: 'admin/user',
    CHANGE_PASSWORD: 'admin/user/change-password'
  },
  WEB: {
    INFO: 'admin/web'
  },
  THEME: {
    LIST: 'admin/theme',
    DETAIL: 'admin/theme/:id',
    NEW: 'admin/theme'
  },
  THEME_DETAIL: {
    DETAIL: 'admin/theme/detail/:id'
  },
  BANNER: {
    LIST: 'admin/banner',
    DETAIL: 'admin/banner/:id',
    NEW: 'admin/banner'
  },
  ROLE: {
    LIST: 'admin/role'
  }
};
