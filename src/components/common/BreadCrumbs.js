'use client';

import { useMemo } from 'react';

import { Breadcrumb } from 'antd';

import { usePathname } from 'constants/common';
import { BREAD_CRUMBS_PATH } from 'constants/custom/breadcrumbs';

const BreadCrumbs = () => {
  const pathname = usePathname();

  const path = useMemo(() => BREAD_CRUMBS_PATH.find(x => pathname?.includes?.(x?.path)), [pathname]);

  const items = useMemo(
    () =>
      path?.path?.split?.('/')?.map?.(x => {
        if (!x) {
          return {
            title: (
              <a href="/">
                <p className="text-on-bkg-grey">Trang chủ</p>
              </a>
            )
          };
        }
        const isInclude = `/${pathname}`?.includes?.(x);

        return {
          title: isInclude ? <p className="text-primary">{path.label}</p> : <a href={x}>{path.label}</a>
        };
      }),
    [path]
  );

  if (!path) {
    return null;
  }

  return (
    <Breadcrumb
      items={items}
      separator={<span className="text-primary"> {'>'}</span>}
      className="hidden py-7 pl-[100px] font-medium md:block"
    />
  );
};

export default BreadCrumbs;
