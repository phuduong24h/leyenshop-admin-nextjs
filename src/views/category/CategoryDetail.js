'use client';

import { Form, FormikProvider } from 'formik';

import { Header } from 'components/common';
import { Button, Input } from 'components/form';
import { useCategoryDetail, useNewCategory, useUpdateCategory } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { CATEGORY_DETAIL_SCHEMA, categoryDetailSchema } from 'utils';

const CategoryDetail = ({ id }) => {
  const isEdit = !!id;

  const { data } = useCategoryDetail(id, { enabled: isEdit });
  const { name } = data?.data || {};

  const { doRequest: onCreate, loading: loadingCreate } = useNewCategory();
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateCategory(id);

  const formik = useValidate({
    initialValues: {
      [CATEGORY_DETAIL_SCHEMA.NAME]: isEdit ? name : ''
    },
    validationSchema: categoryDetailSchema(),
    onSubmit: value => {
      if (isEdit) {
        onUpdate(value);
      } else {
        onCreate(value, formik.resetForm);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <div>
          <Header className="justify-end">
            <Button
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              isLoading={loadingCreate || loadingUpdate}>
              Lưu
            </Button>
          </Header>
          <Input title="Tên loại" placeholder="Nhập tên loại" required name={CATEGORY_DETAIL_SCHEMA.NAME} />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default CategoryDetail;
