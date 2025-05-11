'use client';

import { useEffect } from 'react';

import { Form, FormikProvider } from 'formik';

import { Modal } from 'components/common';
import { Input, Upload } from 'components/form';
import { useCreateSize, useSizeDetail, useUpdateSize, useUpload } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { SIZE_SCHEMA, sizeSchema } from 'utils';

const SizeModal = ({ open, onCancel, afterClose, id, productId }) => {
  const isEdit = !!id;

  const { data: { data: size } = {} } = useSizeDetail(id, { productId }, { enabled: isEdit });
  const { doRequest: onCreate, loading: loadingCreate } = useCreateSize();
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateSize(id);
  const { onUploadMultiple, loading: loadingUploadMultiple } = useUpload();

  const formik = useValidate({
    initialValues: {
      [SIZE_SCHEMA.FILES]: [],
      [SIZE_SCHEMA.NAME]: isEdit ? size?.name : ''
    },
    validationSchema: sizeSchema(),
    onSubmit: async ({ files, ...value }) => {
      let upload = {
        success: false
      };
      const hasUpload = files?.some?.(x => x?.originFileObj);

      if (hasUpload) {
        upload = await onUploadMultiple(files);
      }

      const body = {
        ...value,
        productId
      };

      if (hasUpload) {
        if (upload?.success) {
          body.files = upload.files;
        }
      }

      if (isEdit) {
        onUpdate(body, onCancel);
      } else {
        onCreate(body, onCancel);
      }
    }
  });

  useEffect(() => {
    if (size?.files) {
      formik.onChange(SIZE_SCHEMA.FILES)(size?.files);
    }
  }, [size?.files]);

  const onAfterClose = () => {
    formik.resetForm();
    afterClose?.();
  };

  return (
    <Modal open={open} onCancel={onCancel} title="Thêm kích thước" destroyOnClose afterClose={onAfterClose} width={750}>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input title="Tên kích thước" placeholder="Nhập tên kích thước" required name={SIZE_SCHEMA.NAME} />
            <Upload
              title="Hình ảnh"
              fileList={formik.values[SIZE_SCHEMA.FILES]}
              setFileList={formik.onChange(SIZE_SCHEMA.FILES)}
            />
          </div>
          <Modal.Footer
            onCancel={onCancel}
            disabled={!formik.isValid || !formik.dirty}
            loading={loadingCreate || loadingUpdate || loadingUploadMultiple}
          />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default SizeModal;
