import ThemeDetail from 'views/theme/ThemeDetail';

const ThemeDetailPage = ({ params }) => {
  const { id } = params || {};

  return <ThemeDetail id={id} />;
};

export default ThemeDetailPage;
