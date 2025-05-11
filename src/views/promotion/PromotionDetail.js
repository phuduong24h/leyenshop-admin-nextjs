'use client';

import { Form, FormikProvider } from 'formik';

import { Header } from 'components/common';
import { Button, Input, Select } from 'components/form';
import { Title } from 'components/ui';
import { useCreatePromotion, usePromotionDetail, useUpdatePromotion } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { promotionDetailSchema, PROMOTION_DETAIL_SCHEMA } from 'utils';

const PromotionDetail = ({ id }) => {
  const isEdit = !!id;

  const { data: { data: promotion } = {} } = usePromotionDetail(id, {
    enabled: isEdit
  });

  const { name, discount, type, from, to, status, minAmount } = promotion || {};

  const { doRequest: onCreate, loading: loadingCreatePromotion } = useCreatePromotion();
  const { doRequest: onUpdate, loading: loadingUpdatePromotion } = useUpdatePromotion(id);

  const formik = useValidate({
    initialValues: {
      [PROMOTION_DETAIL_SCHEMA.NAME]: isEdit ? name : '',
      [PROMOTION_DETAIL_SCHEMA.DISCOUNT]: isEdit ? discount : '',
      [PROMOTION_DETAIL_SCHEMA.TYPE]: isEdit ? type : 'invoice',
      [PROMOTION_DETAIL_SCHEMA.STATUS]: isEdit ? status : 'active',
      [PROMOTION_DETAIL_SCHEMA.FROM]: isEdit && from ? new Date(from).toLocaleDateString('en-CA') : '',
      [PROMOTION_DETAIL_SCHEMA.TO]: isEdit && to ? new Date(to).toLocaleDateString('en-CA') : '',
      [PROMOTION_DETAIL_SCHEMA.MIN_AMOUNT]: isEdit ? minAmount : 0
    },
    validationSchema: promotionDetailSchema(),
    onSubmit: async value => {
      const submissionData = { ...value };

      if (isEdit) {
        await onUpdate(submissionData);
      } else {
        await onCreate(submissionData);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <Header className="justify-end">
          <Button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            isLoading={loadingCreatePromotion || loadingUpdatePromotion}>
            Lưu
          </Button>
        </Header>
        <div className="flex flex-col gap-4">
          <Title>Thông tin khuyến mãi</Title>
          <Input title="Tiêu đề" placeholder="Nhập tiêu đề khuyến mãi" required name={PROMOTION_DETAIL_SCHEMA.NAME} />
          <Select
            title="Trạng thái"
            options={[
              { label: 'Kích hoạt', value: 'active' },
              { label: 'Chưa kích hoạt', value: 'inactive' }
            ]}
            name={PROMOTION_DETAIL_SCHEMA.STATUS}
          />
          <Input title="Ngày bắt đầu" type="date" name={PROMOTION_DETAIL_SCHEMA.FROM} />
          <Input title="Ngày kết thúc" type="date" name={PROMOTION_DETAIL_SCHEMA.TO} />
          <Input
            title="Số tiền tối thiểu"
            placeholder="Nhập số tiền tối thiểu"
            required
            name={PROMOTION_DETAIL_SCHEMA.MIN_AMOUNT}
            type="number"
          />
          <Input
            title="Phần trăm giảm giá"
            placeholder="Nhập giá trị giảm giá"
            required
            name={PROMOTION_DETAIL_SCHEMA.DISCOUNT}
            type="number"
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default PromotionDetail;
