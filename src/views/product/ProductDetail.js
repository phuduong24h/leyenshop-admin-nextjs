'use client';

import { useMemo } from 'react';

import { Form, FormikProvider } from 'formik';

import { Header } from 'components/common';
import { Button, Input, QuillEditor, Select, Upload } from 'components/form';
import { ColorTable, SizeTable } from 'components/ui';
import {
  useCategoryList,
  useCreateProduct,
  useProductDetail,
  usePromotionList,
  useUpdateProduct,
  useUpload
} from 'hooks/api';
import { useValidate } from 'hooks/base';
import { productDetailSchema, PRODUCTION_DETAIL_SCHEMA } from 'utils';

const ProductDetail = ({ id }) => {
  const isEdit = !!id;

  const { data: { data: categories } = {}, isLoading: isLoadingCategory } = useCategoryList();

  const { data: { data: promotions } = {}, isLoading: isLoadingPromotion } = usePromotionList();

  const { data: { data: product } = {} } = useProductDetail(id, {
    enabled: isEdit
  });
  const { category, name, price, inventoryCount, detail, promotion, description } = product || {};

  const { onUploadMultiple, loading: loadingUploadMultiple } = useUpload();
  const { doRequest: onCreate, loading: loadingCreateProduct } = useCreateProduct();
  const { doRequest: onUpdate, loading: loadingUpdateProduct } = useUpdateProduct(id);

  const categoryOptions = useMemo(() => categories?.map?.(x => ({ label: x?.name, value: x?.id })), [categories]);

  const promotionOptions = useMemo(
    () => promotions?.map?.(x => ({ label: x?.name, value: x?.id })) || [],
    [promotions]
  );

  const formik = useValidate({
    initialValues: {
      [PRODUCTION_DETAIL_SCHEMA.FILES]: [],
      [PRODUCTION_DETAIL_SCHEMA.CATEGORY_ID]: isEdit ? category?.id : '',
      [PRODUCTION_DETAIL_SCHEMA.NAME]: isEdit ? name : '',
      [PRODUCTION_DETAIL_SCHEMA.PRICE]: isEdit ? price : '',
      [PRODUCTION_DETAIL_SCHEMA.INVENTORY_COUNT]: isEdit ? inventoryCount : '',
      [PRODUCTION_DETAIL_SCHEMA.DETAIL]: isEdit ? detail : '',
      [PRODUCTION_DETAIL_SCHEMA.PROMOTION_ID]: isEdit ? promotion?.id : undefined,
      [PRODUCTION_DETAIL_SCHEMA.DESCRIPTION]: isEdit ? description : ''
    },
    validationSchema: productDetailSchema(),
    onSubmit: async ({ files, ...value }) => {
      let upload = {
        success: false
      };
      const hasUpload = files?.some?.(x => x?.originFileObj);

      if (hasUpload) {
        upload = await onUploadMultiple(files);
      }

      const body = {
        ...value
      };

      if (hasUpload) {
        if (upload?.success) {
          body.files = upload.files;
        }
      }

      if (isEdit) {
        onUpdate(body);
      } else {
        onCreate(body);
      }
    }
  });

  return (
    <div>
      <FormikProvider value={formik}>
        <Form>
          <Header className="justify-end">
            <Button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              isLoading={loadingCreateProduct || loadingUploadMultiple || loadingUpdateProduct}>
              Save
            </Button>
          </Header>
          <div className="flex flex-col gap-4">
            <Upload title="Hình ảnh" description="Tối đa 5 hình ảnh" />
            <Select
              title="Loại sản phẩm"
              placeholder="Chọn loại sản phẩm"
              required
              showSearch
              allowClear
              options={categoryOptions}
              loading={isLoadingCategory}
              name={PRODUCTION_DETAIL_SCHEMA.CATEGORY_ID}
            />
            <Input title="Tên sản phẩm" placeholder="Nhập tên sản phẩm" required name={PRODUCTION_DETAIL_SCHEMA.NAME} />
            <Input title="Giá" placeholder="Nhập giá" required name={PRODUCTION_DETAIL_SCHEMA.PRICE} type="number" />
            <Input
              title="Số lượng tồn"
              placeholder="Nhập số lượng tốn"
              name={PRODUCTION_DETAIL_SCHEMA.INVENTORY_COUNT}
              type="number"
            />
            <Select
              title="Mã giảm giá"
              placeholder="Chọn mã giảm giá"
              required
              showSearch
              allowClear
              options={promotionOptions}
              loading={isLoadingPromotion}
            />
            <QuillEditor title="Chi tiết" name={PRODUCTION_DETAIL_SCHEMA.DETAIL} />
            <QuillEditor title="Mô tả" name={PRODUCTION_DETAIL_SCHEMA.DESCRIPTION} />
            {!!isEdit && (
              <>
                <ColorTable productId={product?.id} />
                <SizeTable productId={product?.id} />
              </>
            )}
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProductDetail;
