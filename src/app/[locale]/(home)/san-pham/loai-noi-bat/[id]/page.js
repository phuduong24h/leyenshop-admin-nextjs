import CategoryFeaturedDetail from 'views/categoryFeatured/CategoryFeaturedDetail';

const CategoryFeaturedDetailPage = ({ params }) => {
  const { id } = params || {};

  return <CategoryFeaturedDetail id={id} />;
};

export default CategoryFeaturedDetailPage;
