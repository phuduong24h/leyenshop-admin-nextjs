'use client';

import { Image } from 'antd';

import { Icons } from 'assets';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-full flex-1">
      <div className="flex h-full items-center bg-primary max-sm:hidden">
        <div className="relative flex items-center justify-center px-8 max-md:px-6">
          <span className="text-[80px] font-bold leading-[97px] text-text-on-primary max-lg:text-[60px] max-lg:leading-[77px] max-md:text-[40px] max-md:leading-[57px]">
            Manage
            <br />
            your
            <br />
            website
          </span>
          <span className="absolute -left-20 text-[100px] font-bold leading-[136px] text-text-on-primary opacity-10 max-lg:-left-14 max-lg:text-[75px] max-lg:leading-[106px] max-md:-left-8 max-md:text-[50px] max-md:leading-[76px]">
            Manage
            <br />
            your
            <br />
            website
          </span>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <div className="absolute left-0 max-w-[282px] max-[1224px]:hidden">
          <Image src={Icons.emotion} preview={false} />
        </div>
        <div className="flex size-full items-center justify-center px-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
