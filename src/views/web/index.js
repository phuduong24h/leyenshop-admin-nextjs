import { useMemo } from 'react';

import { Form, FormikProvider } from 'formik';

import { Header } from 'components/common';
import { Button, Input, InputArea, QuillEditor, Upload } from 'components/form';
import { useAddBanner, useBannerList, useDeleteBanner, useGetWebInfo, useUpdateWebInfo, useUpload } from 'hooks/api';
import { useValidate } from 'hooks/base';
import { WEB_INFO_SCHEMA, webInfoSchema } from 'utils';

const WebInfo = () => {
  const { data: { data } = {} } = useGetWebInfo();
  const { doRequest: onUpdate, loading: loadingUpdate } = useUpdateWebInfo();
  const { data: { data: banners } = {} } = useBannerList();
  const { doRequest: doDeleteBanner } = useDeleteBanner();
  const { doRequest: doAddBanner } = useAddBanner();
  const { onUploadSingle } = useUpload();

  const formik = useValidate({
    initialValues: {
      [WEB_INFO_SCHEMA.NAME]: data?.name || '',
      [WEB_INFO_SCHEMA.LOGO]: data?.logo || '',
      [WEB_INFO_SCHEMA.PHONE]: data?.phone || '',
      [WEB_INFO_SCHEMA.ADDRESS]: data?.address || '',
      [WEB_INFO_SCHEMA.ZALO]: data?.zalo || '',
      [WEB_INFO_SCHEMA.ZALO_LINK]: data?.zaloLink || '',
      [WEB_INFO_SCHEMA.FACEBOOK]: data?.facebook || '',
      [WEB_INFO_SCHEMA.FACEBOOK_LINK]: data?.facebookLink || '',
      [WEB_INFO_SCHEMA.CONTACT]: data?.contact || '',
      [WEB_INFO_SCHEMA.ABOUT_US]: data?.aboutUs || '',
      [WEB_INFO_SCHEMA.SHIPPING_POLICY]: data?.shippingPolicy || '',
      [WEB_INFO_SCHEMA.RETURN_POLICY]: data?.returnPolicy || '',
      [WEB_INFO_SCHEMA.TERM_OF_SERVICE]: data?.termOfService || ''
    },
    validationSchema: webInfoSchema(),
    onSubmit: value => {
      onUpdate(value, formik.resetForm);
    }
  });

  const bannerUnPined = useMemo(() => {
    return banners?.filter?.(item => !item.isPin)?.map?.(x => ({ bannerId: x.id, ...x, ...x.file }));
  }, [banners]);

  const bannerPined = useMemo(() => {
    return banners?.filter?.(item => item.isPin)?.map?.(x => ({ bannerId: x.id, ...x, ...x.file }));
  }, [banners]);

  const handleDeleteBanner = value => {
    doDeleteBanner({ uriParams: { id: value?.bannerId } });
  };

  const handleAddBanner = isPin => async value => {
    const result = await onUploadSingle(value?.file?.originFileObj);
    if (result?.success) {
      doAddBanner({ fileId: result?.file?.id, isPin });
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <Header className="justify-end">
          <Button type="submit" disabled={!formik.isValid || !formik.dirty} isLoading={loadingUpdate}>
            Save
          </Button>
        </Header>
        <div className="flex flex-col gap-4">
          <Input title="Tên cửa hàng" placeholder="Nhập tên cửa hàng" name={WEB_INFO_SCHEMA.NAME} />
          <Input title="Logo" placeholder="Nhập logo" name={WEB_INFO_SCHEMA.LOGO} />
          <Input title="Số điện thoại" placeholder="Nhập số điện thoại" name={WEB_INFO_SCHEMA.PHONE} />
          <InputArea title="Địa chỉ" placeholder="Nhập địa chỉ" name={WEB_INFO_SCHEMA.ADDRESS} />
          <Input title="Zalo" placeholder="Nhập zalo" name={WEB_INFO_SCHEMA.ZALO} />
          <Input title="Zalo link" placeholder="Nhập zalo link" name={WEB_INFO_SCHEMA.ZALO_LINK} />
          <Input title="Facebook" placeholder="Nhập facebook" name={WEB_INFO_SCHEMA.FACEBOOK} />
          <Input title="Facebook link" placeholder="Nhập facebook link" name={WEB_INFO_SCHEMA.FACEBOOK_LINK} />
          <Upload
            title="Ảnh bìa cuộn"
            fileList={bannerUnPined}
            onUpload={handleAddBanner(false)}
            onRemove={handleDeleteBanner}
          />
          <Upload
            title="Ảnh bìa"
            fileList={bannerPined}
            maxCount={3}
            onRemove={handleDeleteBanner}
            onUpload={handleAddBanner(true)}
          />
          <QuillEditor title="Liên hệ" name={WEB_INFO_SCHEMA.CONTACT} />
          <QuillEditor title="Chính sách vận chuyển" name={WEB_INFO_SCHEMA.SHIPPING_POLICY} />
          <QuillEditor title="Về chúng tôi" name={WEB_INFO_SCHEMA.ABOUT_US} />
          <QuillEditor title="Chính sách đổi trả" name={WEB_INFO_SCHEMA.RETURN_POLICY} />
          <QuillEditor title="Điều khoản dịch vụ" name={WEB_INFO_SCHEMA.TERM_OF_SERVICE} />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default WebInfo;
