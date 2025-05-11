'use client';

import { useState } from 'react';

import { Header, Images, Table } from 'components/common';
import { useDeleteOrderProduct, useOrderProductPagination } from 'hooks/api';
import { useFlag } from 'hooks/base';

import AddOrderDetailModal from './AddOrderDetailModal';
import { AddButton } from '../base';
import { ActionTable } from '../table';

const OrderTable = ({ id: orderId, products, setProducts }) => {
  const isEdit = !!orderId;
  const [openOrderDetail, onShowOrderDetail, onHideOrderDetail] = useFlag();

  const [orderDetailId, setOrderDetailId] = useState();
  const [orderDetailData, setOrderDetailData] = useState();

  const { doRequest: onDelete, loading: loadingDelete } = useDeleteOrderProduct(orderId);

  const { data, pagination, isLoading } = useOrderProductPagination(orderId, {}, { enabled: isEdit });

  const handleDelete = id => {
    if (isEdit) {
      onDelete({ uriParams: { id } });
    } else {
      setProducts(prev => prev.filter(x => x.id !== id));
    }
  };

  const onEdit = (id, value) => {
    if (!isEdit) {
      setOrderDetailData(value);
    }
    setOrderDetailId(id);
    onShowOrderDetail();
  };

  const onEditDetail = value => {
    const index = products.findIndex(x => x.id === value.id);
    setProducts(prev => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  const columns = [
    {
      title: 'Id',
      key: 'id',
      width: 70,
      render: ({ id }, _, index) => <span className="text-admin-text-2">{isEdit ? id : index + 1}</span>,
      onCell: ({ id }, value) => ({
        onClick: () => onEdit(id, value)
      })
    },
    {
      title: 'Hình ảnh',
      key: 'image',
      width: 400,
      render: ({ color, size }) => {
        return <Images data={(color?.files || []).concat(size?.files || [])} />;
      }
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      key: 'name',
      render: product => <span>{product?.name}</span>
    },
    {
      title: 'Kích thước',
      dataIndex: 'color',
      key: 'color',
      render: color => <span>{color?.name}</span>
    },
    {
      title: 'Màu sắc',
      dataIndex: 'size',
      key: 'size',
      render: size => <span>{size?.name}</span>
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Giá',
      key: 'price',
      render: ({ unitPrice }) => <span>{unitPrice}</span>
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 110,
      render: ({ id }, value) => {
        return <ActionTable onConfirmDelete={() => handleDelete(id)} onEdit={() => onEdit(id, value)} />;
      }
    }
  ];

  const handleAddProduct = product => {
    setProducts([product, ...products]);
  };

  return (
    <>
      <Header className="justify-end">
        <AddButton isLoading={loadingDelete} onClick={onShowOrderDetail} />
      </Header>
      <Table dataSource={isEdit ? data : products} columns={columns} pagination={pagination} loading={isLoading} />
      <AddOrderDetailModal
        open={openOrderDetail}
        onCancel={onHideOrderDetail}
        onAdd={handleAddProduct}
        onEdit={onEditDetail}
        orderId={orderId}
        orderDetailId={orderDetailId}
        orderDetailData={orderDetailData}
      />
    </>
  );
};

export default OrderTable;
