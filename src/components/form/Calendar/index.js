'use client';

import React from 'react';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Calendar as CalendarAntd } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

import { cn } from 'utils';

import styles from './styles.module.scss';

const Calendar = () => {
  const handlePrevMonth = (value, onChange) => {
    onChange(value.clone().subtract(1, 'month'));
  };

  const handleNextMonth = (value, onChange) => {
    onChange(value.clone().add(1, 'month'));
  };

  const renderHeader = ({ value, onChange }) => {
    return (
      <div className={styles.calendarHeader}>
        <div className={styles.monthTitle}>{value.format('MMMM YYYY')}</div>
        <LeftOutlined className={styles.navButton} onClick={() => handlePrevMonth(value, onChange)} />
        <RightOutlined className={styles.navButton} onClick={() => handleNextMonth(value, onChange)} />
      </div>
    );
  };
  return (
    <div className={cn(styles.calendarContainer, 'max-w-[280px] rounded-md sm:max-w-[240px]')}>
      <CalendarAntd fullscreen={false} headerRender={renderHeader} locale={viVN} />
    </div>
  );
};

export default Calendar;
