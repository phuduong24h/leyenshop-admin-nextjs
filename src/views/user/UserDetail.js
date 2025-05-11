'use client';

import { useMemo } from 'react';

import dayjs from 'dayjs';
import { Form, FormikProvider } from 'formik';

import { Header } from 'components/common';
import { Button, Input, InputArea, Select, Upload } from 'components/form';
import { DATE_FORMAT } from 'constants/common';
import { USER_STATUS } from 'constants/custom';
import { useCreateUser, useRoleList, useUpdateUser, useUpload, useUserDetail } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { USER_SCHEMA, userSchema } from 'utils';

const UserDetail = ({ id }) => {
  const isEdit = !!id;

  const { data: { data } = {} } = useUserDetail(id, {
    enabled: isEdit
  });
  const { data: { data: roles } = {} } = useRoleList();
  const { onUploadSingle, loading: loadingUpload } = useUpload();
  const { doRequest: doUpdateUser, loading: loadingUpdateUser } = useUpdateUser(id);
  const { doRequest: doCreateUser, loading: loadingCreateUser } = useCreateUser();

  const roleMapped = useMemo(() => roles?.map(role => ({ label: role.roleName, value: role.id })), [roles]);

  const formik = useValidate({
    initialValues: {
      files: data?.file ? [data?.file] : null,
      fullName: data?.fullName || '',
      phone: data?.phone || '',
      email: data?.email || '',
      address: data?.address || '',
      roleId: data?.role?.id || '',
      status: data?.status || USER_STATUS.ACTIVE
    },
    validationSchema: userSchema(),
    onSubmit: async ({ files, ...value }) => {
      let upload = {
        success: false
      };
      const hasUpload = files?.some?.(x => x?.originFileObj);

      if (hasUpload) {
        upload = await onUploadSingle(files?.[0]?.originFileObj);
      }

      const body = {
        ...value
      };

      if (hasUpload) {
        if (upload?.success) {
          body.fileId = upload.file.id;
        }
      } else {
        body.fileId = files?.[0]?.id || null;
      }

      if (isEdit) {
        doUpdateUser(body);
      } else {
        doCreateUser(body);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Header className="flex justify-end">
          <Button
            type="submit"
            isLoading={loadingUpdateUser || loadingUpload || loadingCreateUser}
            disabled={!formik.dirty || !formik.isValid}>
            Save
          </Button>
        </Header>
        <div className="flex flex-col gap-4">
          <Upload
            title="Ảnh đại diện"
            maxCount={1}
            multiple={false}
            fileList={formik.values[USER_SCHEMA.FILES]}
            setFileList={formik.onChange(USER_SCHEMA.FILES)}
          />
          <Input title="Họ và tên" name={USER_SCHEMA.FULL_NAME} required />
          <Input title="Số điện thoại" name={USER_SCHEMA.PHONE} required />
          <Input title="Email" name={USER_SCHEMA.EMAIL} />
          {isEdit && <Input title="Tạo ngày" value={dayjs(data?.createdAt).format(DATE_FORMAT.DATE_TIME)} disabled />}
          <InputArea title="Địa chỉ" name={USER_SCHEMA.ADDRESS} />
          <Select title="Quyền" options={roleMapped} name={USER_SCHEMA.ROLE_ID} required />
          <Select
            title="Trạng thái"
            options={[
              { label: 'Kích hoạt', value: USER_STATUS.ACTIVE },
              { label: 'Chưa kích hoạt', value: USER_STATUS.INACTIVE }
            ]}
            name={USER_SCHEMA.STATUS}
            required
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default UserDetail;
