import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import styles from "../../styles/MainPage.module.scss";
import Question from "../../components/Question";
import SliderComponent from "../../components/UI/Slider";
import { rewards } from "../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { PrivateRoutesEnum, PublicRoutesEnum } from "../../utils/consts";
import bookImage from "../../images/booksImages.png";

const MainPage = () => {
  const isAuth = localStorage.getItem("isAuth") ? true : false;
  const { firstname, lastname, patronymic }: any =
    isAuth && JSON.parse(localStorage.getItem("user") || "");
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className={styles.mainContainer}>
        <div className={styles.containerWindow}>
          <div className={styles.textContainer}>
            {isAuth ? (
              <Link to={PrivateRoutesEnum.ProfilePath} className={styles.textLeftPart}>
                <h3>
                  {isAuth && <>{lastname}</>} {isAuth && <>{firstname}</>},
                  Хочешь стать студентом КСТ ?
                </h3>
                <div>
                  подавай завявку на обучение сейчас!
                </div>
              </Link>
            ) : (
              <Link to={PublicRoutesEnum.RegistrationPath} className={styles.textLeftPart}>
                <h3>Хочешь стать студентом КСТ ?</h3>
                <div>
                  подавай завявку на обучение сейчас!
                </div>
              </Link>
            )}
            <div className={styles.textRightPart}>
              <div>
                <h3>Преимущества нашего колледжа</h3>
                <ul>
                  <li>Статус</li>
                  <li>Качество учебы</li>
                  <li>Крутость</li>
                  <li>Статус</li>
                  <li>Качество учебы</li>
                  <li>Крутость</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={bookImage} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
