'use client';

import { useState } from 'react';

import { Layout } from 'antd';
import Image from 'next/image';

import { Images } from 'assets';

import Header from './Header';
import SideBar from './SideBar';

const HomeLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="flex h-screen">
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <SideBar />
      </Layout.Sider>
      <Layout>
        <Header />
        <Layout.Content className="flex flex-1 flex-col overflow-y-scroll bg-background-primary">
          <div className="flex-1 px-6 py-4">{children}</div>
          <div className="mb-6 mr-6 mt-auto self-end">
            <Image src={Images.sitting} width={197} height={212} />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
