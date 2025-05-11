import { useMemo } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Menu, Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHome, FaHouseUser } from 'react-icons/fa';
import { MdLogout, MdOutlineProductionQuantityLimits } from 'react-icons/md';

import { Images } from 'assets';
import { usePathname } from 'constants/common';
import { useLogout } from 'hooks/api';
import { Routes } from 'routes';

import styles from './styles.module.scss';

const MENU_LAYOUT = [
  {
    key: Routes.TRANG_CHU,
    icon: <FaHome />,
    label: 'Trang chủ'
  },
  {
    key: Routes.KHACH_HANG,
    icon: <FaHouseUser />,
    label: 'Khách hàng',
    children: [
      {
        key: Routes.DANH_SACH_KHACH_HANG,
        label: 'Danh sách'
      }
    ]
  },
  {
    key: Routes.SAN_PHAM,
    icon: <MdOutlineProductionQuantityLimits />,
    label: 'Sản phẩm',
    children: [
      {
        key: Routes.DANH_SACH_SAN_PHAM,
        label: 'Danh sách'
      },
      {
        key: Routes.LOAI,
        label: 'Loại'
      },
      {
        key: Routes.LOAI_NOI_BAT,
        label: 'Loại nổi bật'
      },
      {
        key: Routes.KHUYEN_MAI,
        label: 'Giảm giá'
      },
      {
        key: Routes.DON_HANG,
        label: 'Quản lý đơn hàng'
      }
    ]
  },
  {
    key: Routes.QUAN_LY,
    icon: <SettingOutlined />,
    label: 'Quản lý web',
    children: [
      {
        key: Routes.THONG_TIN,
        label: 'Thông tin'
      },
      {
        key: Routes.THEME,
        label: 'Theme'
      }
    ]
  }
];

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { doLogout } = useLogout();

  const defaultSelectedKeys = useMemo(() => {
    const pathNameArr = pathname?.split?.('/');
    if (pathNameArr?.length > 2) {
      return [pathNameArr?.slice?.(0, -1)?.join('/'), pathname];
    }
    return [pathname];
  }, [pathname]);

  const onSelect = value => {
    if (value?.key !== pathname) {
      router.push(value?.key);
    }
  };

  return (
    <div className="flex h-full flex-col bg-primary text-text-on-primary">
      <div className="sticky top-0 z-10 mx-4 flex items-end gap-3 border-b border-white py-6">
        <Image src={Images.logo} alt="logo" width={34} height={44} />
        <div className="">
          <p className="text-lg font-semibold">Lê Yên Shop</p>
          <p className="text-xs">Quản lý</p>
        </div>
      </div>
      <div className={styles.menu}>
        <Menu
          className={'w-full bg-primary text-text-on-primary'}
          items={MENU_LAYOUT}
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={defaultSelectedKeys}
          onClick={onSelect}
        />
      </div>
      <Popconfirm
        title="Đăng xuất"
        placement="rightBottom"
        description="Bạn có muốn đăng xuất?"
        onConfirm={doLogout}
        okText="Có"
        cancelText="Không"
        className="m-6">
        <div className="flex items-center gap-3">
          <MdLogout />
          <span>Đăng xuất</span>
        </div>
      </Popconfirm>
    </div>
  );
};

export default SideBar;
