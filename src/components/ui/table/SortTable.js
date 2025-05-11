'use client';

import { useState } from 'react';

import { Space } from 'antd';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { SORT_TYPE } from 'constants/custom';

const SortTable = ({ title, onChange }) => {
  const [sort, setSort] = useState();

  const handleSetQuery = () => {
    switch (sort) {
      case SORT_TYPE.ASC:
        setSort(SORT_TYPE.DESC);
        onChange?.(SORT_TYPE.DESC);
        break;
      case SORT_TYPE.DESC:
        setSort();
        onChange?.();
        break;
      default:
        setSort(SORT_TYPE.ASC);
        onChange?.(SORT_TYPE.ASC);
        break;
    }
  };

  return (
    <Space size={0} className="flex min-w-max cursor-pointer items-center justify-between" onClick={handleSetQuery}>
      <span />
      <span>{title}</span>
      <Space size={0} direction="vertical">
        <TiArrowSortedUp size={16} color={sort === SORT_TYPE.ASC && 'var(--state-accent)'} />
        <TiArrowSortedDown
          size={16}
          color={sort === SORT_TYPE.DESC && 'var(--state-accent)'}
          style={{ marginTop: -6 }}
        />
      </Space>
    </Space>
  );
};

export default SortTable;
