import { useMemo } from 'react';

import { get } from 'lodash';
import { useParams } from 'next/navigation';

import { NAME_APP, usePathname } from 'constants/common';
import { HEADER_TITLE } from 'constants/custom';

const Header = () => {
  const params = useParams();
  const pathname = usePathname();

  const name = useMemo(() => {
    const isDetail = 'id' in params;
    const subTitle = isDetail ? ` ${params.id}` : '';
    const _pathname = isDetail ? pathname.replace(params.id, ':id') : pathname;

    return `${get(HEADER_TITLE, _pathname, 'N/A')}${subTitle}`;
  }, [pathname]);

  return (
    <div className="z-10 flex flex-col justify-between gap-1 bg-white px-6 pb-[10px] pt-4 shadow-md">
      <span className="text-xl font-medium">Welcome, {NAME_APP} 👋</span>
      <span className="text-3xl font-bold">{name}</span>
    </div>
  );
};

export default Header;
