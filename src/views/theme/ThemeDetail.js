'use client';

import { useMemo } from 'react';

import { Form, FormikProvider } from 'formik';

import { Button, Header, Input } from 'components/form';
import { useCreateTheme, useDeleteThemeDetail, useThemeDetail, useUpdateTheme } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { checkColor, THEME_SCHEMA, themeSchema } from 'utils';

const DEFAULT_ITEM = {
  name: '',
  code: '',
  color: ''
};

const ThemeDetail = ({ id }) => {
  const isEdit = !!id;

  const { doRequest: onCreate, loading: loadingCreate } = useCreateTheme();
  const { doRequest: onDelete } = useDeleteThemeDetail();
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateTheme(id);
  const { data: { data } = {} } = useThemeDetail(id, { enabled: isEdit });

  const initialValues = useMemo(
    () => ({
      name: isEdit ? data?.name : '',
      themes: isEdit ? data?.themes : []
    }),
    [isEdit, data]
  );

  const formik = useValidate({
    initialValues,
    validationSchema: themeSchema(),
    onSubmit: value => {
      if (isEdit) {
        onUpdate(value);
      } else {
        onCreate(value);
      }
    }
  });

  const disabled = useMemo(() => formik.values.themes?.length >= 20, [formik.values.themes]);

  const onAddTheme = () => {
    formik.setFieldValue('themes', [...formik.values.themes, DEFAULT_ITEM]);
  };

  const onDeleteTheme = (item, index) => () => {
    if (item.id) {
      onDelete({ uriParams: { id: item.id } });
    } else {
      const themes = [...formik.values.themes];
      themes.splice(index, 1);
      formik.setFieldValue('themes', themes);
    }
  };

  const onChangeValue = (name, index) => e => {
    const key = `themes[${index}].${name}`;
    const { value } = e.target;
    formik.setFieldValue(key, value);
  };

  const renderTheme = (item, index) => {
    const { name, code, color } = item || {};
    const isColor = checkColor(color);

    return (
      <div key={index} className="flex items-center gap-2">
        <Input placeholder="Nhập tên" value={name} onChange={onChangeValue('name', index)} />
        <span> : </span>
        <Input placeholder="Nhập code" value={code} onChange={onChangeValue('code', index)} />
        <Input placeholder="Nhập mã màu" value={color} onChange={onChangeValue('color', index)} />
        <div
          className="relative flex size-6 items-center justify-center border"
          style={{ backgroundColor: isColor ? color : 'transparent' }}>
          {!isColor && <div className="absolute h-full w-px rotate-45 bg-red-500" />}
        </div>
        <Button onClick={onDeleteTheme(item, index)}>Xóa</Button>
      </div>
    );
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <Header className="flex justify-end">
          <Button type="submit" disabled={!formik.dirty || !formik.isValid} isLoading={loadingCreate || loadingUpdate}>
            Save
          </Button>
        </Header>
        <div className="flex flex-col gap-8">
          <Input title="Tên" name={THEME_SCHEMA.NAME} />
          <div>
            <div className="flex flex-col gap-3">{formik.values.themes?.map?.(renderTheme)}</div>
            <Button className="mt-4" disabled={disabled} onClick={onAddTheme}>
              Thêm màu
            </Button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default ThemeDetail;
