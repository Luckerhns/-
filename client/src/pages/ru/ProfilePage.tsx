import React from "react";
import styles from "../../styles/pages/ProfilePage.module.scss";
import logout from "../../icons/logout.png";
import { useActions } from "../../hooks/useActions";
import NavCard from "../../components/UI/profile/NavCard";
import { PrivateRoutesEnum } from "../../utils/consts";

const ProfilePage = () => {
  const { logOut } = useActions();
  const { firstname, lastname, patronymic }: any =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") || "");
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileUserContainer}>
        <div className={styles.profileUser}>
          <div className={styles.profileUserData}>
            <img className={styles.profileUserImage} src="#" alt="#" />
            <div className={styles.profileUserInfo}>
              <div>{firstname}</div>
              <span>{lastname}</span>
              <span>{lastname}</span>
            </div>
          </div>
          <div className={styles.profileUserLogout}>
            <div className={styles.logoutBtn} onClick={logOut}>
              <img src={logout} />
              <div>Выйти</div>
            </div>
          </div>
        </div>
        <div className={styles.profileUserRecommendations}>
          <NavCard
            title={"На главную"}
            content={"Вернуться на главную страницу"}
            navigation={PrivateRoutesEnum.MainPath}
          />
          <NavCard
            title={"Дневник"}
            content={"Посмотрите расписание и оценки"}
            navigation={PrivateRoutesEnum.BookPath}
          />
          <NavCard
            title={"Дневник"}
            content={"Посмотрите расписание и оценки"}
            navigation={PrivateRoutesEnum.BookPath}
          />
          <NavCard
            title={"Дневник"}
            content={"Посмотрите расписание и оценки"}
            navigation={PrivateRoutesEnum.BookPath}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
