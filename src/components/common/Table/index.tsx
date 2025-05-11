'use client';

import { memo } from 'react';

import { Table as TableAntd, TableProps } from 'antd';

import styles from './styles.module.scss';

const Table = (props: TableProps) => {
  return <TableAntd className={styles.container} bordered {...props} />;
};

export default memo(Table);
