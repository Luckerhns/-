import burger from "../icons/burger.png";
import favorites from "../icons/favorites.png";
import loop from "../icons/loop.png";
import order from "../icons/order.png";
import login from "../icons/login.png";

import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.scss";
import { useActions } from "../hooks/useActions";
import {
  PrivateNavbarRoutesArray,
  PrivateRoutesEnum,
  PublicNavbarRoutesArray,
  PublicRoutesEnum,
} from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ReactFlagsSelect from "react-flags-select";
import { Switch } from "@mui/material";
import { themes } from "../utils/colors";
import Burger from "../components/UI/Burger";

const Navbar = () => {
  const { openModal, setLightTheme, setDarkTheme, CloseBurger } = useActions();
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("isAuth") ? true : false;
  const { firstname, lastname, patronymic }: any =
    isAuth && JSON.parse(localStorage.getItem("user") || "");

  // localStorage.clear()

  const openPage = (
    route: string,
    toProfile?: boolean,
    therapyType?: string
  ) => {
    if (toProfile) {
      setDarkTheme();
      setTimeout(() => {
        openModal();
      }, 1000);
      setLightTheme();
    } else {
      setDarkTheme();
      setTimeout(() => {
        navigate(route);
        setLightTheme();
        window.location.reload();
      }, 1000);
    }
  };

  const { theme } = useTypedSelector((state) => state.theme);
  const [flag, setFlag] = useState("RU");
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <header className={styles.header__container}>
      <div className={styles.header}>
        <div className={styles.second__header}>
          <div className={styles.second__grid}>
            <Link
              className={styles.header__logo}
              to={PublicRoutesEnum.MainPath}
            >
              Электронный дневник
            </Link>
            <Link
              className={styles.header__logo}
              to={PublicRoutesEnum.MainPath}
            >
              КСТ-СДО
            </Link>
            <Burger isBurger={true} />
          </div>
        </div>
        <div className={styles.main__header}>
          <div className={styles.header__container}>
            {!localStorage.getItem("isAuth")
              ? PublicNavbarRoutesArray.map((route, i) => (
                  <a
                    key={i}
                    onClick={() =>
                      openPage(route.path, route.toProfile, route.therapyType)
                    }
                  >
                    {route.pathName}
                  </a>
                ))
              : PrivateNavbarRoutesArray.map((route, i) => (
                  <a
                    key={i}
                    onClick={() =>
                      openPage(route.path, route.toProfile, route.therapyType)
                    }
                  >
                    {route.pathName}
                  </a>
                ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
