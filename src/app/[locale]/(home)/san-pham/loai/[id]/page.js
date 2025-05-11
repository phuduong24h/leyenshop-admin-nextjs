import CategoryDetail from 'views/category/CategoryDetail';

const CategoryDetailPage = ({ params }) => {
  const { id } = params || {};

  return <CategoryDetail id={id} />;
};

export default CategoryDetailPage;
