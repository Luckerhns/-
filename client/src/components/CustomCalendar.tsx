import React, { useEffect, useState } from "react";
import styles from "../styles/components/CustomCalendar.module.scss";
import { Badge, Calendar, Col, Radio, Row, Select, Typography } from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
import { event, monthsRu, monthsRuList, weekDaysRu } from "../utils/data";
import { useActions } from "../hooks/useActions";
import CalendarHeaderComponent from "./Calendar/CalendarHeader";
import { Moment } from "moment";
import { useTypedSelector } from "../hooks/useTypedSelector";
import FreeTimesCell from "./UI/Cells/FreeTimesCell";
import BusyTimesCell from "./UI/Cells/BusyTimesCell";
import { getCalendar } from "../http/recordApi";
import { findCurrentDate } from "../utils/functions";
import AdminCell from "./UI/Cells/AdminCell";

const CustomCalendar = ({ withHeader, forAdmin }: any) => {
  const [currentDate, setCurrentDate] = useState(() => dayjs("2023-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2023-01-25"));
  const [day, setDay] = useState<any>();
  const [month, setMonth] = useState<any>();
  const [weekDay, setWeekDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const {
    openRecordModalTimes,
    closeRecordModal,
    selectUserDate,
    setTimes,
    OpenUserModalTimes,
  } = useActions();
  const { selectedStateDate, allTimes, selectedUserDate } = useTypedSelector(
    (state) => state.recordModal
  );

  const [events, setEvents] = useState(event);

  const groupId: any = JSON.parse(localStorage.getItem("user") || "").groupId;

  useEffect(() => {
    getCalendar(groupId).then((value) => {
      //@ts-ignore
      setEvents(value ? JSON.parse(value.data.calendar) : event);
      //@ts-ignore
    });
    //@ts-ignore
    // .catch(console.log("ERROR"));
  }, []);

  const currentWeekDay = weekDaysRu[weekDay - 1];

  const onPanelChange = (newValue: Dayjs) => {
    setCurrentDate(newValue);
  };

  let [isDateExists, setIsDateExists] = useState(false);

  useEffect(() => {
    if (events?.length > 0) {
      for (let i = 0; i < events?.length; i++) {
        if (events[i].date !== selectedDate) {
          setIsDateExists(false);
        } else {
          setIsDateExists(true);
          break;
        }
      }
    }
  }, [selectedDate]);
  const onSelect = (newValue: Dayjs) => {
    setCurrentDate(newValue);
    setSelectedValue(newValue);
    setSelectedDate(newValue.format("YYYY-MM-DD"));

    selectUserDate(newValue.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    setDay(currentDate.date());
    setMonth(currentDate.get("month"));
    setWeekDay(currentDate.day() + 1);
  }, [currentDate, selectedValue]);

  useEffect(() => {
    const allTimes = findCurrentDate(events, selectedDate);
    openRecordModalTimes(selectedDate);
    setTimeout(() => closeRecordModal(), 200);
    console.log("GGGG");
  }, []);

  // localStorage.clear()

  const [dateExists, setDateExists] = useState(true);

  const openRecordModal = async (
    withModal?: boolean,
    date?: string,
    addNewDate?: boolean
  ) => {
    const listLength = events?.length;
    // const allTimes = findCurrentDate(events, selectedStateDate);
    // !withModal && openRecordModalTimes(allTimes, selectedDate, events);
    // if (!isDateExists && addNewDate) {
    //   //@ts-ignore
    //   setEvents((prevState) => [
    //     ...prevState,
    //     {
    //       date: date ? date : String(selectedDate),
    //       username: "",
    //       freeTimes: [],
    //       //@ts-ignore
    //       notSelectedTimes: [...notSelectedTimes],
    //       busyTimes: [],
    //     },
    //   ]);
    // }
    openRecordModalTimes(selectedDate);
    console.log("GGGG");
    setIsDateExists(true);
  };

  return (
    <div className={styles.calendar__section}>
      <Calendar
        locale={locale}
        onSelect={onSelect}
        value={currentDate}
        onPanelChange={onPanelChange}
        className={styles.my__calendar}
        headerRender={({ value, type, onChange, onTypeChange }: any) => (
          <CalendarHeaderComponent
            value={value}
            type={type}
            onChange={onChange}
            onTypeChange={onTypeChange}
            weekDay={currentWeekDay}
            day={day}
            monthsList={monthsRu[month]}
            currentYear={currentDate.get("year")}
            forAdmin={Boolean(localStorage.getItem("isAdmin"))}
          />
        )}
        cellRender={(date: any) => {
          let counter = 0;
          let dateCounter = 0;

          if (!forAdmin) {
            return (
              events !== undefined &&
              events.map((eventDate, key) => {
                const selectedRecordField =
                  date.format("YYYY-MM-DD") === selectedDate;

                if (eventDate.date.includes(date.format("YYYY-MM-DD"))) {
                  dateCounter++;

                  if (+dateCounter === 1) {
                    dateCounter = 0;
                    return <BusyTimesCell />;
                  } else {
                    dateCounter = 0;
                    return (
                      <FreeTimesCell
                        selectedRecordField={selectedRecordField}
                      />
                    );
                  }
                } else {
                  counter++;
                  if (counter === +events.length) {
                    return <BusyTimesCell />;
                  }
                }
                return <div></div>;
              })
            );
          }

          // ADMIN CALENDAR

          if (forAdmin) {
            const selectedRecordField =
              date.format("YYYY-MM-DD") === selectedDate;
            const selectedCellDate = date.format("YYYY-MM-DD");
            let counter = 0;
            if (events.length > 0) {
              return events.map((eventDate: any, key: any) => {
                if (counter < 1) {
                  counter++;
                  return (
                    <AdminCell
                      openRecordModal={openRecordModal}
                      openRecordModalTimes={openRecordModalTimes}
                      eventDate={eventDate}
                      events={events}
                      selectedRecordField={selectedRecordField}
                      selectedCellDate={selectedCellDate}
                    />
                  );
                } else {
                  counter = 1;
                  if (counter > 1) {
                    return <div>error</div>;
                  }
                }
              });
            } else {
              return (
                <div className={`${styles.record__cell}`}>
                  <div className={styles.admin__btn__container}>
                    <div
                      style={{ opacity: selectedRecordField ? 1 : 0 }}
                      className={styles.admin__btn}
                      onClick={
                        selectedRecordField ? () => openRecordModal() : () => {}
                      }
                    >
                      редактировать
                    </div>
                  </div>
                </div>
              );
            }
          }
        }}
      />
    </div>
  );
};

export default CustomCalendar;
