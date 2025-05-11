import { useMemo } from 'react';

import { Form, FormikProvider } from 'formik';

import { Modal } from 'components/common';
import { Select } from 'components/form';
import { useProductList } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { PRODUCT_MODAL_SCHEMA, productModalSchema } from 'utils';

const AddProductModal = ({ open, onCancel, onSubmit, afterClose }) => {
  const { data: { data: products } = {}, isLoading } = useProductList();

  const formik = useValidate({
    initialValues: {
      [PRODUCT_MODAL_SCHEMA.PRODUCT]: ''
    },
    validationSchema: productModalSchema(),
    onSubmit: async value => {
      onSubmit?.(value[PRODUCT_MODAL_SCHEMA.PRODUCT]);
      formik.resetForm();
      onCancel?.();
    }
  });

  const productsMapped = useMemo(() => {
    return products?.map?.(product => ({
      value: product.id,
      label: product.name,
      ...product
    }));
  }, [products]);

  const onAfterClose = () => {
    formik.resetForm();
    afterClose?.();
  };

  const handleChange = (_, item) => {
    formik.setFieldValue(PRODUCT_MODAL_SCHEMA.PRODUCT, item);
  };

  return (
    <Modal open={open} onCancel={onCancel} title="Thêm sản phẩm" destroyOnClose afterClose={onAfterClose} width={750}>
      <FormikProvider value={formik}>
        <Form className="flex flex-col gap-6">
          <Select
            title="Sản phẩm"
            required
            disabled={isLoading}
            options={productsMapped}
            value={formik.values[PRODUCT_MODAL_SCHEMA.PRODUCT]}
            onChange={handleChange}
            allowClear
            showSearch
          />
          <Modal.Footer onCancel={onCancel} disabled={!formik.isValid || !formik.dirty} />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddProductModal;
