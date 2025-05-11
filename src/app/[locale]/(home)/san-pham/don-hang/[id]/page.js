import OrderDetail from 'views/order/OrderDetail';

const OrderDetailPage = ({ params }) => {
  const { id } = params || {};

  return <OrderDetail id={id} />;
};

export default OrderDetailPage;
