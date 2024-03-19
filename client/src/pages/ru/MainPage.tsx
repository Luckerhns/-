import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import styles from "../../styles/MainPage.module.scss";
import Question from "../../components/Question";
import SliderComponent from "../../components/UI/Slider";
import { rewards } from "../../utils/data";
import { Link } from "react-router-dom";
import { PublicRoutesEnum } from "../../utils/consts";

const MainPage = () => {
  return (
    <MainLayout>
      <div className={styles.main__container}></div>
    </MainLayout>
  );
};

export default MainPage;
