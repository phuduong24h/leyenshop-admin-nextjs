export const PAYMENT_METHOD = {
  CASH: 'cash',
  CREDIT: 'credit'
};

export const PAYMENT_METHOD_NAME = {
  [PAYMENT_METHOD.CASH]: 'Tiền mặt',
  [PAYMENT_METHOD.CREDIT]: 'Thẻ'
};

export const PAYMENT_METHOD_OPTIONS = [
  {
    label: PAYMENT_METHOD_NAME[PAYMENT_METHOD.CASH],
    value: PAYMENT_METHOD.CASH
  },
  {
    label: PAYMENT_METHOD_NAME[PAYMENT_METHOD.CREDIT],
    value: PAYMENT_METHOD.CREDIT
  }
];

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PENDING: 'pending',
  PAID: 'paid'
};

export const PAYMENT_STATUS_NAME = {
  [PAYMENT_STATUS.UNPAID]: 'Chưa thanh toán',
  [PAYMENT_STATUS.PENDING]: 'Đang chờ thanh toán',
  [PAYMENT_STATUS.PAID]: 'Đã thanh toán'
};

export const PAYMENT_STATUS_OPTIONS = [
  {
    label: PAYMENT_STATUS_NAME[PAYMENT_STATUS.UNPAID],
    value: PAYMENT_STATUS.UNPAID
  },
  {
    label: PAYMENT_STATUS_NAME[PAYMENT_STATUS.PENDING],
    value: PAYMENT_STATUS.PENDING
  },
  {
    label: PAYMENT_STATUS_NAME[PAYMENT_STATUS.PAID],
    value: PAYMENT_STATUS.PAID
  }
];
