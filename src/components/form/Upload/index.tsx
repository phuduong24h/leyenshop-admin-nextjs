'use client';

import { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload as AntdUpload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { FormWrapperProps } from 'types';

import FormWrapper from '../FormWrapper';

import type { GetProp, UploadFile, UploadProps as AntdUploadProps } from 'antd';

type FileType = Parameters<GetProp<AntdUploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

interface UploadProps extends Omit<AntdUploadProps, 'children'>, FormWrapperProps {
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
  onUpload?: (file: UploadChangeParam<UploadFile<string>>) => void;
}

const UploadBase = ({ maxCount = 5, onChange, fileList, setFileList, onUpload, ...props }: UploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = (file: UploadChangeParam<UploadFile<string>>) => {
    const { fileList: newFileList } = file;

    setFileList?.(newFileList);
    onChange?.(file);

    if (file?.file?.status === 'uploading') {
      onUpload?.(file);
    }
  };

  return (
    <>
      <AntdUpload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        maxCount={maxCount}
        multiple
        {...props}
        onChange={handleChange}>
        {(!fileList || fileList?.length < maxCount!) && (
          <button className="flex flex-col items-center justify-center gap-2 border-none bg-none" type="button">
            <PlusOutlined />
            <div>Upload</div>
          </button>
        )}
      </AntdUpload>
      {!!previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

const Upload = (props: UploadProps) => {
  return (
    <FormWrapper {...props}>
      <UploadBase {...props} />
    </FormWrapper>
  );
};

export default Upload;
