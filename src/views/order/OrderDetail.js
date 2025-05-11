'use client';

import { useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { Form, FormikProvider } from 'formik';

import { Header } from 'components/common';
import { Button, FormWrapper, Input, Select } from 'components/form';
import { OrderTable, Title } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { PAYMENT_METHOD_OPTIONS, PAYMENT_STATUS_OPTIONS } from 'constants/custom';
import { useCreateOrder, useGetTotalPrice, useOrderDetail, useUpdateOrder, useUserList } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { ORDER_SCHEMA, orderSchema } from 'utils';

const OrderDetail = ({ id }) => {
  const isEdit = !!id;

  const { data: { data: order } = {}, loading: loadingOrder } = useOrderDetail(id, { enabled: isEdit });
  const { doRequest: onCreate, loading: loadingCreate } = useCreateOrder();
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateOrder(id);
  const {
    data: { data: { totalPrice } = {} } = {},
    refetch: refetchTotalPrice,
    isLoading: isLoadingTotalPrice,
    isRefetching: isRefetchingTotalPrice
  } = useGetTotalPrice(id, {
    enabled: isEdit
  });
  const { data: { data: users } = {}, loading: loadingUser } = useUserList();

  const [products, setProducts] = useState([]);

  const userOption = useMemo(
    () =>
      users?.map?.(user => ({
        ...user,
        label: user.fullName,
        value: user.id
      })),
    [users]
  );

  const totalPriceMapped = useMemo(() => {
    if (isEdit) {
      return totalPrice;
    }
    return products?.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  }, [products, totalPrice]);

  const initialValues = useMemo(
    () => ({
      [ORDER_SCHEMA.USER_ID]: isEdit ? order?.userId : undefined,
      [ORDER_SCHEMA.CUSTOMER_NAME]: isEdit ? order?.customerName : '',
      [ORDER_SCHEMA.CUSTOMER_PHONE]: isEdit ? order?.customerPhone : '',
      [ORDER_SCHEMA.CUSTOMER_ADDRESS]: isEdit ? order?.customerAddress : '',
      [ORDER_SCHEMA.SHIPPING_FEE]: isEdit ? order?.shippingFee : 0,
      [ORDER_SCHEMA.PAYMENT_PAID]: isEdit ? order?.paymentPaid : 0,
      [ORDER_SCHEMA.PAYMENT_METHOD]: isEdit ? order?.paymentMethod : '',
      [ORDER_SCHEMA.PAYMENT_STATUS]: isEdit ? order?.paymentStatus : ''
    }),
    [order]
  );

  const formik = useValidate({
    initialValues,
    validationSchema: orderSchema(),
    onSubmit: value => {
      if (isEdit) {
        onUpdate(value, formik.resetForm);
      } else {
        const productsMapped = products.map(product => ({
          productId: product.product.id,
          colorId: product.color.id,
          sizeId: product.size.id,
          quantity: product.quantity
        }));
        onCreate({ ...value, products: productsMapped }, formik.resetForm);
      }
    }
  });

  const onSelectUser = (userId, value) => {
    if (!userId) {
      formik.setFieldValue(ORDER_SCHEMA.USER_ID, undefined);

      return;
    }
    formik.setValues({
      ...formik.values,
      [ORDER_SCHEMA.USER_ID]: userId,
      [ORDER_SCHEMA.CUSTOMER_NAME]: value?.fullName,
      [ORDER_SCHEMA.CUSTOMER_PHONE]: value?.phone,
      [ORDER_SCHEMA.CUSTOMER_ADDRESS]: value?.address
    });
  };

  const disabled = useMemo(() => !!formik.values[ORDER_SCHEMA.USER_ID], [formik.values]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Header className="justify-end">
          <Button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            loading={loadingCreate || loadingUpdate || loadingOrder}>
            Lưu
          </Button>
        </Header>
        <div className="flex flex-col gap-[60px]">
          {!!isEdit && (
            <div>
              <Title title="Thông tin đơn hàng" />
              <div className="flex flex-col gap-4">
                <Input title="Mã đơn hàng" disabled value={order?.orderCode} />
                <Input title="Ngày tạo" disabled value={dayjs(order?.createdAt).format(DATE_FORMAT.DATE)} />
                <Input title="Giờ tạo" disabled value={dayjs(order?.createdAt).format(DATE_FORMAT.TIME)} />
              </div>
            </div>
          )}
          <div>
            <Title title="Thông tin khách hàng" />
            <div className="flex flex-col gap-4">
              <Select
                title="Khách hàng"
                placeholder="Chọn khách hàng"
                options={userOption}
                loading={loadingUser}
                allowClear
                showSearch
                value={formik.values[ORDER_SCHEMA.USER_ID]}
                onChange={onSelectUser}
              />
              <Input
                title="Tên khách hàng"
                placeholder="Nhập tên khách hàng"
                required
                disabled={disabled}
                name={ORDER_SCHEMA.CUSTOMER_NAME}
              />
              <Input
                title="Số điện thoại"
                placeholder="Nhập số điện thoại"
                required
                disabled={disabled}
                name={ORDER_SCHEMA.CUSTOMER_PHONE}
              />
              <Input
                title="Địa chỉ"
                placeholder="Nhập địa chỉ"
                required
                disabled={disabled}
                name={ORDER_SCHEMA.CUSTOMER_ADDRESS}
              />
            </div>
          </div>
          <div>
            <Title title="Thông tin thanh toán" />
            <div className="flex flex-col gap-4">
              <FormWrapper title="Tổng tiền">
                <div className="flex max-w-[250px] items-center gap-2">
                  <span className="w-full">{totalPriceMapped}</span>
                  <Button
                    className="w-40"
                    onClick={refetchTotalPrice}
                    disabled={!products?.length}
                    isLoading={isLoadingTotalPrice || isRefetchingTotalPrice}>
                    Cập nhật
                  </Button>
                </div>
              </FormWrapper>
              <Input
                title="Phí ship"
                placeholder="Nhập phí ship"
                type="number"
                required
                name={ORDER_SCHEMA.SHIPPING_FEE}
              />
              <Input
                title="Đã thanh toán"
                placeholder="Nhập đã thanh toán"
                type="number"
                name={ORDER_SCHEMA.PAYMENT_PAID}
              />
              <Select
                title="Phương thức thanh toán"
                placeholder="Chọn phương thức thanh toán"
                required
                options={PAYMENT_METHOD_OPTIONS}
                name={ORDER_SCHEMA.PAYMENT_METHOD}
              />
              <Select
                title="Trạng thái"
                placeholder="Chọn trạng thái"
                required
                options={PAYMENT_STATUS_OPTIONS}
                name={ORDER_SCHEMA.PAYMENT_STATUS}
              />
            </div>
          </div>
          <div>
            <Title title="Danh sách sản phẩm" />
            <OrderTable id={id} products={products} setProducts={setProducts} />
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default OrderDetail;
