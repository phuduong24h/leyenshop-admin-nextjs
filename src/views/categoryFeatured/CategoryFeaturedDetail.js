'use client';

import { useMemo } from 'react';

import { Form, FormikProvider } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Header, Table } from 'components/common';
import { Button, FormWrapper, Select } from 'components/form';
import { AddButton, AddProductModal } from 'components/ui';
import { MAX_PRODUCT_IN_CATEGORY_HOT } from 'constants/custom';
import {
  useCategoryFeaturedDetail,
  useCategoryList,
  useDeleteProductFeatured,
  useNewCategoryFeatured,
  useNewProductFeatured
} from 'hooks/api';
import { useFlag, useValidate } from 'hooks/base';
import { useProductTable } from 'hooks/custom';
import { Routes } from 'routes';
import { CATEGORY_FEATURED_SCHEMA, categoryHotSchema } from 'utils';

const CategoryFeaturedDetail = ({ id: categoryFeaturedId }) => {
  const router = useRouter();

  const isEdit = !!categoryFeaturedId;

  const { data: { data: categories } = {} } = useCategoryList();
  const { data: { data } = {}, isLoading: isLoadingCategoryFeatured } = useCategoryFeaturedDetail(categoryFeaturedId, {
    enabled: !!isEdit
  });

  const { doRequest: onCreate, loading: loadingCreate } = useNewCategoryFeatured();
  const { doRequest: doDeleteProduct, loading: loadingDeleteProduct } = useDeleteProductFeatured(categoryFeaturedId);
  const { doRequest: doCreateProduct, loading: loadingCreateProduct } = useNewProductFeatured(categoryFeaturedId);

  const [visibleProductModal, onShowProductModal, onHideProductModal] = useFlag();

  const categoriesMapped = useMemo(() => {
    return categories?.map?.(category => ({
      value: category.id,
      label: category.name
    }));
  }, [categories]);

  const { category, products } = useMemo(() => data || {}, [data]);
  const productMapped = useMemo(() =>
    products?.map?.(x => ({ ...x, ...x.product, productFeaturedId: x?.id }), [products])
  );

  const formik = useValidate({
    initialValues: {
      [CATEGORY_FEATURED_SCHEMA.CATEGORY_ID]: isEdit ? category?.id : '',
      [CATEGORY_FEATURED_SCHEMA.PRODUCTS]: isEdit ? productMapped : []
    },
    validationSchema: categoryHotSchema(),
    onSubmit: value => {
      const body = {
        [CATEGORY_FEATURED_SCHEMA.CATEGORY_ID]: value[CATEGORY_FEATURED_SCHEMA.CATEGORY_ID],
        productIds: value[CATEGORY_FEATURED_SCHEMA.PRODUCTS].map(product => product.id)
      };
      onCreate(body, formik.resetForm);
    }
  });

  const redirectToDetail = id => {
    router.push(Routes.CHI_TIET_SAN_PHAM.replace(':id', id));
  };

  const onAddProduct = value => {
    if (formik.values[CATEGORY_FEATURED_SCHEMA.PRODUCTS]?.length >= MAX_PRODUCT_IN_CATEGORY_HOT) {
      toast.error(`Tối đa ${MAX_PRODUCT_IN_CATEGORY_HOT} sản phẩm`);
      return;
    }

    if (isEdit) {
      doCreateProduct(
        {
          productId: value.id,
          categoryFeaturedId
        },
        formik.resetForm
      );
    } else {
      formik.setFieldValue(CATEGORY_FEATURED_SCHEMA.PRODUCTS, [
        ...formik.values[CATEGORY_FEATURED_SCHEMA.PRODUCTS],
        value
      ]);
    }
  };

  const onDeleteProduct = (_, index, item) => {
    if (isEdit) {
      doDeleteProduct({ uriParams: { id: item.productFeaturedId } });
    } else {
      const arr = formik.values[CATEGORY_FEATURED_SCHEMA.PRODUCTS];
      arr.splice(index, 1);
      formik.setFieldValue(CATEGORY_FEATURED_SCHEMA.PRODUCTS, arr);
    }
  };

  const { columns } = useProductTable({
    redirectToDetail,
    onDelete: onDeleteProduct,
    onEdit: redirectToDetail,
    hideEdit: true
  });

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <Header className="justify-end">
            <Button type="submit" disabled={!formik.isValid || !formik.dirty} isLoading={loadingCreate}>
              Lưu
            </Button>
          </Header>
          <div className="flex flex-col gap-4">
            <Select
              title="Loại"
              required
              options={categoriesMapped}
              name={CATEGORY_FEATURED_SCHEMA.CATEGORY_ID}
              disabled={isEdit}
            />
            <div>
              <Header className="mb-2">
                <FormWrapper.Title title="Danh sách sản phẩm" column required />
                <AddButton onClick={onShowProductModal} />
              </Header>
              <Table
                columns={columns}
                dataSource={formik.values[CATEGORY_FEATURED_SCHEMA.PRODUCTS]}
                loading={isLoadingCategoryFeatured || loadingDeleteProduct || loadingCreateProduct}
              />
            </div>
          </div>
        </Form>
      </FormikProvider>
      <AddProductModal open={visibleProductModal} onCancel={onHideProductModal} onSubmit={onAddProduct} />
    </>
  );
};

export default CategoryFeaturedDetail;
