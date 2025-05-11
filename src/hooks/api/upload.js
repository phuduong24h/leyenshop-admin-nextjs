'use client';

import { useState } from 'react';

import axios from 'axios';
import FormData from 'form-data';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';

import { API, API_ROOT } from 'constants/common';
import { getErrorMessage } from 'utils';

export const useUpload = () => {
  const [loading, setLoading] = useState();

  const onUploadSingle = async originFileObj => {
    try {
      setLoading(true);
      const formData = new FormData();
      const session = await getSession();

      formData.append('file', originFileObj);
      const response = await axios.request({
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.user?.token}`
        },
        url: API_ROOT + API.UPLOAD.SINGLE
      });

      return {
        success: true,
        file: response?.data?.data
      };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return {
        success: false,
        message
      };
    } finally {
      setLoading(false);
    }
  };

  const onUploadMultiple = async fileList => {
    try {
      setLoading(true);
      const formData = new FormData();
      const session = await getSession();

      fileList?.forEach?.(item => {
        if (item?.originFileObj) {
          formData.append('files', item?.originFileObj);
        }
      });

      const response = await axios.request({
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${session?.user?.token}`
        },
        url: API_ROOT + API.UPLOAD.MULTIPLE
      });

      let index = 0;
      const files = fileList?.map?.(item => {
        if (item?.originFileObj) {
          const newItem = response?.data?.data?.[index];
          index++;
          return newItem;
        }
        return item;
      });

      return {
        success: true,
        files
      };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return {
        success: false,
        message
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onUploadSingle,
    onUploadMultiple
  };
};
