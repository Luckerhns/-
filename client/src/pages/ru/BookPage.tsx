import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import styles from "../../styles/pages/RecordPage.module.scss";
import { event } from "../../utils/data";
import { useActions } from "../../hooks/useActions";
import { $user } from "../../http";

const BookPage = () => {
  const isAuth = localStorage.getItem("isAuth") ? true : false;
  const user = isAuth && JSON.parse(localStorage.getItem("user") || "");

  const { openRecordModal } = useActions();

  const student = user && user.role === "STUDENT";
  const teacher = user && user.role === "TEACHER";
  const admin = user && user.role === "ADMIN";

  console.log(user);

  const [events, setEvents] = useState(event);

  const getEvents = async () => {
    try {
      await $user.post("/api/events/get-events").then((res) => {
        setEvents(res.data);
        console.log(res.data);
      });
    } catch (error: any) {
      console.log("ERROR" + error.message);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  const deletePost = async (id: number) => {
    let res = await $user.post("/api/events/delete-event", { id });
    console.log(res);
  };

  return (
    <MainLayout>
      <div className={styles.homeworksContainer}>
        <div></div>
        {admin && (
          <div onClick={openRecordModal} className={styles.addWorkBtn}>
            Добавить задание
          </div>
        )}
        {isAuth &&
          events.map((data) => (
            <div className={styles.homeworkCard}>
              <div>{data.date}</div>
              <div>{data.work}</div>
              {admin && (
                <div
                  className={styles.deleteBtn}
                  onClick={() => {
                    deletePost(data.id);
                    setEvents((prevData) => {
                      return prevData.filter((post) => post.id !== data.id);
                    });
                  }}
                >
                  Удалить запись
                </div>
              )}
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default BookPage;
