import React, { FC } from "react";
import styles from "../../styles/UI/Burger.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Burger from "./Burger";
import {
  PrivateNavbarRoutesArray,
  PrivateRoutesEnum,
  PublicNavbarRoutesArray,
  PublicRoutesEnum,
} from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { privateRoutes } from "../../utils/routes";

const BurgerMenu: FC = () => {
  const { isBurgerOpen } = useTypedSelector((state) => state.burger);
  const { openModal, setLightTheme, setDarkTheme, SetBurgerClose } =
    useActions();
  const navigate = useNavigate();

  const openPage = (route: string, toProfile?: boolean) => {
    if (toProfile) {
      if (localStorage.getItem("isAdmin")) {
        setDarkTheme();
        setTimeout(() => {
          navigate(PrivateRoutesEnum.ProfilePath);
          setLightTheme();
        }, 1000);
      } else {
        openModal();
      }
    } else {
      setDarkTheme();
      SetBurgerClose();
      setTimeout(() => {
        navigate(route);
        setLightTheme();
      }, 1000);
    }
  };

  return (
    <div
      className={
        isBurgerOpen
          ? `${styles.burger__container} ${styles.active}`
          : `${styles.burger__container}`
      }
    >
      <div className={styles.burger__container__content}>
        <div>
          <Burger />
        </div>
        <div className={styles.burger__container__body}>
          {localStorage.getItem("isAuth")
            ? PrivateNavbarRoutesArray.map((route) => (
                <a onClick={() => openPage(route.path, route.toProfile)}>
                  {route.pathName}
                </a>
              ))
            : PublicNavbarRoutesArray.map((route) => (
                <a onClick={() => openPage(route.path, route.toProfile)}>
                  {route.pathName}
                </a>
              ))}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
