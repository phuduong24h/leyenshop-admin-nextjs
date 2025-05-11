import dayjs from 'dayjs';

import { Images } from 'components/common';
import { ActionTable, SortTable, Tags } from 'components/ui';
import { DATE_FORMAT } from 'constants/common';
import { formatMoney } from 'utils';

export const useProductTable = ({ redirectToDetail, onDelete, onEdit, setCreatedAt, hideEdit } = {}) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: id => <span className="cursor-pointer text-state-accent">{id}</span>,
      onCell: e => ({
        onClick: () => redirectToDetail?.(e.id)
      })
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'files',
      key: 'files',
      width: 200,
      render: files => <Images data={files} />
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: price => <span>{formatMoney(price)}</span>
    },
    {
      title: 'Số lượng tồn',
      dataIndex: 'inventoryCount',
      key: 'inventoryCount'
    },
    {
      title: 'Kích thước',
      dataIndex: 'sizes',
      key: 'sizes',
      width: 150,
      render: _sizes => <Tags data={_sizes} field="name" />
    },
    {
      title: 'Màu sắc',
      dataIndex: 'colors',
      key: 'colors',
      width: 150,
      render: _colors => <Tags data={_colors} field="name" />
    },
    {
      title: <SortTable title="Ngày tạo" onChange={setCreatedAt} />,
      key: 'createdAt',
      width: 170,
      render: ({ createdAt }) => {
        return <span>{dayjs(createdAt).format(DATE_FORMAT.DATE_TIME)}</span>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 110,
      render: (item, index) => {
        return (
          <ActionTable
            onConfirmDelete={() => onDelete?.(item.id, index, item)}
            onEdit={() => onEdit?.(item.id)}
            hideEdit={hideEdit}
          />
        );
      }
    }
  ];

  return { columns };
};
