import React from 'react';
import styles from "../../../styles/components/CustomCalendar.module.scss";

const BusyTimesCell = () => {
  return (
    <div
    className={`${styles.record__cell} ${styles.disabled__cell}`}
  >
    <div className={styles.cell__content}>
      На этот день нет никаких материалов и оценок
    </div>
  </div>
  );
};

export default BusyTimesCell;