import React, { useState } from "react";
import styles from "../../styles/RecordPage.module.scss";
import MainLayout from "../../Layout/MainLayout";
import CustomCalendar from "../../components/CustomCalendar";

const BookPage = () => {

  const isAuth = localStorage.getItem("isAuth") ? true : false;
  const user = isAuth && JSON.parse(localStorage.getItem("user") || "").user;

  const student = user && user.role === "STUDENT";
  const teacher = user && user.role === "TEACHER";
  const admin = user && user.role === "ADMIN";

console.log(!student);

  return (
    <MainLayout>
      <CustomCalendar withHeader={true} forAdmin={!student} />
    </MainLayout>
  );
};

export default BookPage;
