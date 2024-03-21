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

  const isTeacher = JSON.parse(localStorage.getItem("user") || "").role === "ADMIN"

  console.log(isTeacher)

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


  function addNewFreeTime(current: string) {
    // let selectedObjectIndex: number = 0;
    // events.map((e, i) => {
    //   if (e.date == selectedStateDate) {
    //     selectedObjectIndex = i;
    //     e.notSelectedTimes.map((target, i) => {
    //       //@ts-ignore
    //       if (target.includes(current)) {
    //         //@ts-ignore
    //         setEvents((prevData) => [...prevData, e.freeTimes.push(target)]);
    //         //@ts-ignore
    //         setEvents((prevData) => [
    //           ...prevData,
    //           e.notSelectedTimes.splice(i, 1),
    //         ]);
    //       }
    //     });
    //   }
    // });
    // setCurrentFunc("freeTimes");
  }

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

      {isTeacher && (
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
        </div>
      )}
    </div>
  );
};

export default CalendarModal;
