import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../styles/UI/CalendarModal.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Button, Dropdown, MenuProps } from "antd";
import PhoneInput from "react-phone-input-2";
import {
  activeButton,
  checkEmail,
  eraseFreeTime,
  findCurrentDate,
  sortReadyList,
} from "../../utils/functions";
import { event } from "../../utils/data";
import { $user } from "../../http";

const CalendarModal = () => {
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [currentFunc, setCurrentFunc] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [accessForm, setAccessForm] = useState(Boolean);
  const [events, setEvents] = useState(event);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const isTeacher =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") || "")?.role === "ADMIN";

  console.log(isTeacher);

  const items: MenuProps["items"] = [];
  const recordType: MenuProps["items"] = [];

  const { saveNewCalendar, closeRecordModal, setSelectedTime, createRecord } =
    useActions();

  const {
    isRecordOpen,
    allTimes,
    selectedStateDate,
    allDates,
    selectedUserDate,
    selectedTime,
  } = useTypedSelector((state) => state.recordModal);

  useEffect(() => {
    //@ts-ignore
    setTimeout(setEvents(allDates), 200);
  }, [allDates]);

  const checkPhoneFunction = (e: string) => {
    setPhone(e);
    if (phone.length >= 11) {
      setAccessForm(true);
    } else {
      setAccessForm(false);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    allTimes[0] &&
      //@ts-ignore
      allTimes[0].map((el, i) => {
        console.log(selectedTime, selectedStateDate, "ALLTIMES RECORD MODAL");
        items.push({
          key: i,
          label: (
            <div
              onClick={(e) => {
                setSelectedTime(el as string);
              }}
            >
              {el}
            </div>
          ),
        });
      });
  }, [items]);

  const dateData = findCurrentDate(events, selectedStateDate);

  // console.log(dateData, events)

  const [date, setDate] = useState("");
  const [work, setWork] = useState("");

  const send = async (date: any, work: string) => {
    await $user.post("/api/events/add-event", { date, work });
    console.log("GREAT");
    console.log(typeof date, date);
  };


  return (
    <div
      className={
        isRecordOpen
          ? `${styles.main__container__time} ${styles.active}`
          : styles.main__container__time
      }
      onClick={closeRecordModal}
    >
      {/* //
        // SECOND ADMIN SECTION
        // */}

      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div>Добавить дату</div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <div>Добавить задание</div>
          <input
            type="text"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
        <div
          onClick={() => {
            send(date, work);
            window.location.reload()
          }}
        >
          Создать
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
