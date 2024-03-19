import React from "react";
import MainLayout from "../../Layout/MainLayout";
import styles from "../../styles/AboutmePage.module.scss";
import kamen_gorod from "../../icons/aboutme/kamen_gorod.jpeg";

const AboutmePage = () => {
  return (
    <MainLayout>
      <div className={styles.aboutme__title}>
        <div className={styles.left__section}>
          <h2>Кто же я такая?</h2>
          <br />
          <div>
            Меня зовут Таня и я - психолог. Родилась я в 1981 году в г.
            Большой-Камень Приморского края. Окончила Дальневосточный
            государственный университет (специальность юриспруденция).
            <br />
            <br />
            Работала в администрации г. Владивостока, потом руководителем
            юридической компании. Параллельно всегда интересовалась психологией:
            посещала курсы, семинары, тренинги, длительные терапевтические и
            обучающие группы. Какое-то время совмещала юридическую и
            психологическую практику.{" "}
          </div>
        </div>
        <div className={styles.right__section}>
          <img src={kamen_gorod} />
        </div>
      </div>
      <div className={styles.aboutme__body}>
        <div className={styles.left__section}></div>
        <div className={styles.right__section}></div>
      </div>
    </MainLayout>
  );
};

export default AboutmePage;
