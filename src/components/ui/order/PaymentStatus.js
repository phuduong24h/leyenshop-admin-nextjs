import { useMemo } from 'react';

import { PAYMENT_STATUS, PAYMENT_STATUS_NAME } from 'constants/custom';
import { cn } from 'utils';

const PaymentStatus = ({ status }) => {
  const { text, borderColor, backgroundColor, color } = useMemo(() => {
    switch (status) {
      case PAYMENT_STATUS.PAID:
        return {
          borderColor: '#B7EB8F',
          color: '#52C41A',
          backgroundColor: '#F6FFED',
          text: PAYMENT_STATUS_NAME[PAYMENT_STATUS.PAID]
        };
      case PAYMENT_STATUS.PENDING:
        return {
          borderColor: '#FFE58F',
          color: '#FAAD14',
          backgroundColor: '#FFFBE6',
          text: PAYMENT_STATUS_NAME[PAYMENT_STATUS.PENDING]
        };
      case PAYMENT_STATUS.UNPAID:
      default:
        return {
          borderColor: '#FFA39E',
          color: '#F5222D',
          backgroundColor: '#FFF1F0',
          text: PAYMENT_STATUS_NAME[PAYMENT_STATUS.UNPAID]
        };
    }
  }, [status]);

  return (
    <div className="flex items-center gap-2 border px-2 py-1" style={{ backgroundColor, borderColor }}>
      <span className="text-base" style={{ color }}>
        {text}
      </span>
    </div>
  );
};

export default PaymentStatus;
