'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { toast } from 'sonner';

import { logger } from 'hooks/services';
import { Routes } from 'routes';
import { showCommonError } from 'utils';

export const useLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const doLogin = async ({ provider = 'credentials', ...data }, { onSuccess } = {}) => {
    setLoading(true);

    try {
      const callbackUrl = searchParams.get('callbackUrl') || undefined;

      const result = await signIn(provider, {
        ...data,
        redirect: !!callbackUrl,
        callbackUrl
      });
      if (result?.ok) {
        onSuccess?.();
        toast.success('Đăng nhập thành công');
        if (!callbackUrl) {
          router.replace(Routes.TRANG_CHU);
        }
      } else {
        showCommonError(JSON.parse(result?.error || '{}'));
      }
    } catch (error) {
      showCommonError(error || {});
    } finally {
      setLoading(false);
    }
  };

  return {
    doLogin,
    loading
  };
};

export const useLogout = () => {
  const doSignOut = async () => {
    try {
      signOut({
        redirect: true,
        callbackUrl: Routes.DANG_NHAP
      });
    } catch (err) {
      logger.error(err);
    }
  };

  return { doLogout: doSignOut };
};
