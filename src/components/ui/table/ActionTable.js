'use client';

import { Popconfirm } from 'antd';

const ActionTable = ({ onConfirmDelete, hideEdit, onEdit }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Popconfirm
        placement="topRight"
        description="Bạn có chắc muốn xoá?"
        icon={null}
        okText="Có"
        cancelText="Không"
        onConfirm={onConfirmDelete}>
        <span className="text-state-accent">Xoá</span>
      </Popconfirm>
      {!hideEdit && <div className="h-3 w-px bg-border-primary" />}
      {!hideEdit && (
        <span className="text-state-accent" onClick={onEdit} aria-hidden>
          Sửa
        </span>
      )}
    </div>
  );
};

export default ActionTable;
