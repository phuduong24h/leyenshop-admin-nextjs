import { AuthLayout } from 'components/layouts';
import { NAME_APP } from 'constants/common';

export const metadata = {
  title: NAME_APP,
  description: ''
};

export default function AuthLayoutPage({ children }) {
  return <AuthLayout>{children}</AuthLayout>;
}
