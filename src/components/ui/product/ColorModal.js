'use client';

import { useEffect } from 'react';

import { Form, FormikProvider } from 'formik';

import { Modal } from 'components/common';
import { Input, Upload } from 'components/form';
import { useColorDetail, useCreateColor, useUpdateColor, useUpload } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { COLOR_SCHEMA, colorSchema } from 'utils';

const ColorModal = ({ open, onCancel, afterClose, id, productId }) => {
  const isEdit = !!id;

  const { data: { data: color } = {} } = useColorDetail(id, { productId }, { enabled: isEdit });
  const { doRequest: onCreate, loading: loadingCreate } = useCreateColor();
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateColor(id);
  const { onUploadMultiple, loading: loadingUploadMultiple } = useUpload();

  const formik = useValidate({
    initialValues: {
      [COLOR_SCHEMA.FILES]: [],
      [COLOR_SCHEMA.NAME]: isEdit ? color?.name : ''
    },
    validationSchema: colorSchema(),
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
    if (color?.files) {
      formik.onChange(COLOR_SCHEMA.FILES)(color?.files);
    }
  }, [color?.files]);

  const onAfterClose = () => {
    formik.resetForm();
    afterClose?.();
  };

  return (
    <Modal open={open} onCancel={onCancel} title="Thêm màu" destroyOnClose afterClose={onAfterClose} width={750}>
      <FormikProvider>
        <Form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input title="Tên màu" placeholder="Nhập tên màu" required name={COLOR_SCHEMA.NAME} />
            <Upload
              title="Hình ảnh"
              fileList={formik.values[COLOR_SCHEMA.FILES]}
              setFileList={formik.onChange(COLOR_SCHEMA.FILES)}
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

export default ColorModal;
