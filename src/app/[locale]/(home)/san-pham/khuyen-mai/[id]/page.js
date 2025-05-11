'use client';

import PromotionDetail from 'views/promotion/PromotionDetail';

const PromotionPage = ({ params }) => {
  const { id } = params || {};

  return <PromotionDetail id={id} />;
};

export default PromotionPage;
