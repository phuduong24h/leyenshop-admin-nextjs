import { Form, FormikProvider } from 'formik';

import { Modal } from 'components/common';
import { Input } from 'components/form';
import { useChangePassword } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { CHANGE_PASSWORD_SCHEMA, changePasswordSchema } from 'utils';

const ChangePasswordModal = ({ open, onCancel, afterClose, userId }) => {
  const { doRequest: doChangePassword, loading: loadingChangePassword } = useChangePassword();

  const formik = useValidate({
    initialValues: {
      [CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD]: '',
      [CHANGE_PASSWORD_SCHEMA.CONFIRM_PASSWORD]: ''
    },
    validationSchema: changePasswordSchema(),
    onSubmit: async value => {
      doChangePassword(
        {
          userId,
          password: value[CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD]
        },
        () => {
          formik.resetForm();
          onCancel?.();
        }
      );
    }
  });

  const onAfterClose = () => {
    formik.resetForm();
    afterClose?.();
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Đổi mật khẩu"
      loading={loadingChangePassword}
      destroyOnClose
      afterClose={onAfterClose}
      width={750}>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6">
          <Input title="Mật khẩu mới" name={CHANGE_PASSWORD_SCHEMA.NEW_PASSWORD} required isPassword />
          <Input title="Nhập lại mật khẩu" name={CHANGE_PASSWORD_SCHEMA.CONFIRM_PASSWORD} required isPassword />
          <Modal.Footer onCancel={onCancel} disabled={!formik.isValid || !formik.dirty} />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ChangePasswordModal;
