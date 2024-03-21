import React, { FC } from "react";
import styles from "../../../styles/components/CustomCalendar.module.scss";
import { useActions } from "../../../hooks/useActions";
import {
  CalendarData,
  IAdminCell,
  ICalendarData,
} from "../../../types/Calendar";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const AdminCell: FC<IAdminCell> = ({
  selectedRecordField,
  eventDate,
  openRecordModal,
  openRecordModalTimes,
  events,
  selectedCellDate,
}) => {
  const { selectedUserDate } = useTypedSelector((state) => state.recordModal);
  const currentDate = events.find((date: any) => {if(date.date === eventDate?.date) return date.date});
  console.log(currentDate)
  return (
    <div
      className={styles.admin__cell}
      onClick={() => {
        // openRecordModal(true, selectedCellDate, true);
        console.log(eventDate, selectedCellDate);
      }}
    >
      <div className={styles.cell__content}>
        <span>На этот день была пара</span>
        <div className={styles.admin__btn__container}>
          <div
            style={{ opacity: selectedRecordField ? 1 : 0 }}
            className={styles.admin__btn}
            onClick={
              selectedRecordField
                ? () => {
                    openRecordModalTimes(selectedCellDate, eventDate);
                    console.log(eventDate);
                  }
                : () => console.log(eventDate)
            }
          >
            редактировать
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCell;
