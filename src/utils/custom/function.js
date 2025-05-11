import numeral from 'numeral';

export const formatMoney = (value, unit = '0,0') => {
  return numeral(value).format(unit);
};
