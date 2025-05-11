import UserDetail from 'views/user/UserDetail';

const UserDetailPage = ({ params }) => {
  const { id } = params || {};
  return <UserDetail id={id} />;
};

export default UserDetailPage;
