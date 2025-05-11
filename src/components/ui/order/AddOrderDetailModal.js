import { useEffect, useMemo, useState } from 'react';

import { Form, FormikProvider } from 'formik';
import { v4 } from 'uuid';

import { Modal } from 'components/common';
import { Input, Select } from 'components/form';
import { useCreateOrderProduct, useOrderProductDetail, useProductList, useUpdateOrderProduct } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { ORDER_DETAIL_SCHEMA, orderDetailSchema } from 'utils';

const AddOrderDetailModal = ({ open, onCancel, orderId, orderDetailId, orderDetailData, onAdd, onEdit }) => {
  const isEdit = !!orderDetailId;

  const { data: { data: products } = {}, isLoading: isLoadingProductList } = useProductList();
  const { data: { data: orderProduct } = {}, isLoading: isLoadingOrderProduct } = useOrderProductDetail(orderDetailId, {
    enabled: !!orderDetailId
  });
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateOrderProduct(orderDetailId, orderId);
  const { doRequest: onCreate, loading: loadingCreate } = useCreateOrderProduct(orderId);

  const [options, setOptions] = useState({
    sizes: [],
    colors: []
  });

  const productOptions = useMemo(
    () =>
      products?.map?.(product => ({
        ...product,
        label: product.name,
        value: product.id
      })),
    [products]
  );

  const formik = useValidate({
    initialValues: {
      [ORDER_DETAIL_SCHEMA.PRODUCT_ID]: undefined,
      [ORDER_DETAIL_SCHEMA.COLOR_ID]: undefined,
      [ORDER_DETAIL_SCHEMA.SIZE_ID]: undefined,
      [ORDER_DETAIL_SCHEMA.UNIT_PRICE]: undefined,
      [ORDER_DETAIL_SCHEMA.QUANTITY]: undefined
    },
    validationSchema: orderDetailSchema(),
    onSubmit: value => {
      if (isEdit) {
        onUpdate(value, onCancel);
      } else {
        const product = products?.find?.(item => item.id === value[ORDER_DETAIL_SCHEMA.PRODUCT_ID]);
        const color = product?.colors?.find?.(item => item.id === value[ORDER_DETAIL_SCHEMA.COLOR_ID]);
        const size = product?.sizes?.find?.(item => item.id === value[ORDER_DETAIL_SCHEMA.SIZE_ID]);
        const quantity = value[ORDER_DETAIL_SCHEMA.QUANTITY];
        const unitPrice = value[ORDER_DETAIL_SCHEMA.UNIT_PRICE];

        if (orderId) {
          onCreate(
            {
              productId: value[ORDER_DETAIL_SCHEMA.PRODUCT_ID],
              colorId: value[ORDER_DETAIL_SCHEMA.COLOR_ID],
              sizeId: value[ORDER_DETAIL_SCHEMA.SIZE_ID],
              quantity,
              unitPrice
            },
            onCancel
          );
        } else {
          const body = {
            id: orderDetailData ? orderDetailData?.id : v4(),
            product,
            color,
            size,
            quantity,
            unitPrice
          };

          if (orderDetailData) {
            onEdit(body);
          } else {
            onAdd(body);
          }
          onCancel();
        }
      }
    }
  });

  useEffect(() => {
    if (open && (orderDetailData || orderProduct)) {
      const orderDetail = orderDetailData || orderProduct;
      const product = products?.find?.(item => item.id === orderDetail?.product?.id);
      const sizes = product?.sizes?.map?.(size => ({ label: size.name, value: size.id })) || [];
      const colors = product?.colors?.map?.(color => ({ label: color.name, value: color.id })) || [];

      setOptions({ sizes, colors });

      formik.setValues({
        [ORDER_DETAIL_SCHEMA.PRODUCT_ID]: orderDetail?.product?.id,
        [ORDER_DETAIL_SCHEMA.COLOR_ID]: orderDetail?.color?.id,
        [ORDER_DETAIL_SCHEMA.SIZE_ID]: orderDetail?.size?.id,
        [ORDER_DETAIL_SCHEMA.QUANTITY]: orderDetail?.quantity,
        [ORDER_DETAIL_SCHEMA.UNIT_PRICE]: orderDetail?.unitPrice
      });
    }
  }, [open, orderDetailData, orderProduct]);

  const onChangeProduct = (value, item) => {
    if (!value) {
      formik.resetForm();
      return;
    }

    const sizes = item?.sizes?.map?.(size => ({ label: size.name, value: size.id })) || [];
    const colors = item?.colors?.map?.(color => ({ label: color.name, value: color.id })) || [];

    setOptions({ sizes, colors });

    formik.setValues({
      [ORDER_DETAIL_SCHEMA.PRODUCT_ID]: value,
      [ORDER_DETAIL_SCHEMA.COLOR_ID]: colors?.[0]?.value,
      [ORDER_DETAIL_SCHEMA.SIZE_ID]: sizes?.[0]?.value,
      [ORDER_DETAIL_SCHEMA.UNIT_PRICE]: sizes?.[0]?.sizePrice || item?.price,
      [ORDER_DETAIL_SCHEMA.QUANTITY]: 0
    });
  };

  const isDisabled = useMemo(() => !formik.values[ORDER_DETAIL_SCHEMA.PRODUCT_ID], [formik.values]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      destroyOnClose
      afterClose={formik.resetForm}
      title="Thêm sản phẩm"
      loading={isLoadingOrderProduct}>
      <FormikProvider value={formik}>
        <Form>
          <Modal.Content>
            <Select
              title="Sản phẩm"
              placeholder="Chọn sản phẩm"
              options={productOptions}
              loading={isLoadingProductList}
              allowClear
              showSearch
              value={formik.values[ORDER_DETAIL_SCHEMA.PRODUCT_ID]}
              onChange={onChangeProduct}
            />
            <Select
              title="Kích thước"
              placeholder="Chọn kích thước"
              disabled={isDisabled}
              options={options.sizes}
              name={ORDER_DETAIL_SCHEMA.SIZE_ID}
            />
            <Select
              title="Màu sắc"
              placeholder="Chọn màu sắc"
              disabled={isDisabled}
              options={options.colors}
              name={ORDER_DETAIL_SCHEMA.COLOR_ID}
            />
            <Input
              title="Giá"
              placeholder="Nhập giá"
              disabled={isDisabled}
              type="number"
              name={ORDER_DETAIL_SCHEMA.UNIT_PRICE}
            />
            <Input
              title="Số lượng"
              placeholder="Nhập số lượng"
              disabled={isDisabled}
              type="number"
              name={ORDER_DETAIL_SCHEMA.QUANTITY}
            />
          </Modal.Content>
          <Modal.Footer
            onCancel={onCancel}
            disabled={!formik.isValid || !formik.dirty}
            loading={loadingUpdate || loadingCreate}
          />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default AddOrderDetailModal;
