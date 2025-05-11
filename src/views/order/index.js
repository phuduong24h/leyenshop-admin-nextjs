import { useState } from 'react';

import dayjs from 'dayjs';
import { get } from 'lodash';
import { useRouter } from 'next/navigation';

import { Header, Table } from 'components/common';
import { ActionTable, AddButton, PaymentStatus, SortTable } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { PAYMENT_METHOD_NAME } from 'constants/custom';
import { useDeleteOrder, useOrderPagination } from 'hooks/api';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

const Order = () => {
  const route = useRouter();

  const [createdAt, setCreatedAt] = useState();

  const { data, pagination, isLoading } = useOrderPagination({ createdAt });
  const { doRequest: onDelete, loading: loadingDelete } = useDeleteOrder();

  const redirectToDetail = id => () => {
    route.push(Routes.CHI_TIET_DON_HANG.replace(':id', id));
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: id => <span className="cursor-pointer text-state-accent">{id}</span>,
      onCell: e => ({
        onClick: redirectToDetail(e.id)
      })
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode'
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerPhone',
      key: 'customerPhone'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'customerAddress',
      key: 'customerAddress'
    },
    {
      title: 'Phí ship',
      dataIndex: 'shippingFee',
      key: 'shippingFee',
      render: shippingFee => <span>{formatMoney(shippingFee)}</span>
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: totalPrice => <span>{formatMoney(totalPrice)}</span>
    },
    {
      title: 'Đã thanh toán',
      dataIndex: 'paymentPaid',
      key: 'paymentPaid',
      render: paymentPaid => <span>{formatMoney(paymentPaid)}</span>
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: paymentStatus => {
        return <span>{get(PAYMENT_METHOD_NAME, paymentStatus, 'N/A')}</span>;
      }
    },
    {
      title: 'Tình trạng thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: paymentStatus => {
        return <PaymentStatus status={paymentStatus} />;
      }
    },
    {
      title: <SortTable title="Ngày tạo" onChange={setCreatedAt} />,
      key: 'createdAt',
      width: 170,
      render: ({ createdAt: _createdAt }) => {
        return <span>{dayjs(_createdAt).format(DATE_FORMAT.DATE_TIME)}</span>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 110,
      render: ({ id }) => {
        return <ActionTable onEdit={redirectToDetail(id)} onConfirmDelete={() => onDelete({ uriParams: { id } })} />;
      }
    }
  ];

  const redirectToAddCategory = () => {
    route.push(Routes.THEM_DON_HANG);
  };

  return (
    <div>
      <Header className="justify-end">
        <AddButton onClick={redirectToAddCategory} />
      </Header>
      <Table dataSource={data} columns={columns} pagination={pagination} loading={isLoading || loadingDelete} />
    </div>
  );
};

export default Order;
