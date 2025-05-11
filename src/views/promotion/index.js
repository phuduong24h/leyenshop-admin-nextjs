import { useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Header, Table } from 'components/common';
import { Select } from 'components/form';
import { ActionTable, AddButton, SortTable } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { SORT_TYPE } from 'constants/custom';
import { useDeletePromotion, usePromotionList, usePromotionPagination } from 'hooks/api/promotion';
import { Routes } from 'routes';

const Promotion = () => {
  const route = useRouter();
  const [selectedStatus, setSelectedStatus] = useState([]);

  const { data: { data: promotions } = {}, loading: loadingPromotions } = usePromotionList({
    createdAt: SORT_TYPE.DESC,
    status: selectedStatus.length ? selectedStatus : undefined
  });

  const { pagination } = usePromotionPagination({ status: selectedStatus });

  const { doRequest: onDelete, loading: loadingDelete } = useDeletePromotion();

  const redirectToAddPromotion = () => {
    route.push(Routes.THEM_KHUYEN_MAI);
  };

  const redirectToDetail = id => () => {
    route.push(Routes.CHI_TIET_KHUYEN_MAI.replace(':id', id));
  };

  const promotionTypes = useMemo(() => {
    return [
      { label: 'Kích hoạt', value: 'active' },
      { label: 'Chưa kích hoạt', value: 'inactive' }
    ];
  }, []);

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
      title: 'Promotion name',
      dataIndex: 'name',
      key: 'name',
      render: name => <span>{name}</span>
    },
    {
      title: 'Promotion discount',
      dataIndex: 'discount',
      key: 'discount',
      render: discount => <span>Giảm {discount}</span>
    },

    {
      title: <SortTable title="Từ ngày" />,
      key: 'fromDate',
      width: 170,
      render: ({ from: _from }) => {
        return <span>{_from ? dayjs(_from).format(DATE_FORMAT.DATE) : '-'}</span>;
      }
    },
    {
      title: <SortTable title="Đến ngày" />,
      key: 'toDate',
      width: 170,
      render: ({ to: _to }) => {
        return <span>{_to ? dayjs(_to).format(DATE_FORMAT.DATE) : '-'}</span>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const isActive = status === 'active';
        return (
          <span className={isActive ? 'text-green-500' : 'text-red-500'}>
            {isActive ? 'Kích hoạt' : 'Chưa kích hoạt'}
          </span>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: ({ id }) => {
        return <ActionTable onConfirmDelete={() => onDelete({ uriParams: { id } })} onEdit={redirectToDetail(id)} />;
      }
    }
  ];

  return (
    <div>
      <Header className="flex items-center justify-end gap-9">
        <Select
          options={promotionTypes}
          mode="multiple"
          placeholder="Chọn loại khuyến mãi"
          maxTagCount="responsive"
          allowClear
          loading={loadingPromotions}
          formWrapperClassName="w-[154px]"
          value={selectedStatus}
          onChange={setSelectedStatus}
        />
        <AddButton onClick={redirectToAddPromotion} />
      </Header>
      <Table
        dataSource={promotions}
        columns={columns}
        loading={loadingDelete || loadingPromotions}
        pagination={pagination}
      />
    </div>
  );
};

export default Promotion;
