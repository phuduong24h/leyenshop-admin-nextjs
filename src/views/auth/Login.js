'use client';

import { Image } from 'antd';
import { Form, FormikProvider } from 'formik';

import { Icons } from 'assets';
import { Button, CheckBox, Input } from 'components/form';
import { useLogin } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { LOGIN_SCHEMA, loginSchema } from 'utils';

const Login = () => {
  const { doLogin, loading } = useLogin();

  const formik = useValidate({
    initialValues: {
      phone: '',
      password: '',
      remember: false
    },
    validationSchema: loginSchema(),
    onSubmit: data => {
      doLogin(data);
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="flex flex-col items-center">
          <Image src={Icons.logo} preview={false} height={94} width={74} />
          <span className="mt-10 text-[38px] font-bold">Đăng Nhập</span>
          <div className="mt-[30px] flex w-[366px] flex-col">
            <Input
              title="Số điện thoại"
              column
              placeholder="Nhập số điện thoại"
              wrapperClassName="max-w-full"
              name={LOGIN_SCHEMA.PHONE}
            />
            <Input
              title="Mật khẩu"
              column
              placeholder="Nhập mật khẩu"
              isPassword
              formWrapperClassName="mt-4"
              wrapperClassName="max-w-full"
              name={LOGIN_SCHEMA.PASSWORD}
            />
            <CheckBox label="Nhớ mật khẩu" className="mt-2" name={LOGIN_SCHEMA.REMEMBER} />
          </div>
          <Button
            type="submit"
            label="Đăng nhập"
            className="mt-[30px] w-3/4"
            disabled={!formik.isValid}
            isLoading={loading}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default Login;
