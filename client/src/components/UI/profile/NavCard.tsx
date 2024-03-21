import React, { FC } from "react";
import styles from "../../../styles/pages/ProfilePage.module.scss";
import { Link } from "react-router-dom";

interface INavCard {
  title: string;
  content: string;
  navigation: string;
}

const NavCard: FC<INavCard> = ({ title, content, navigation }) => {
  return (
    <Link to={navigation} className={styles.recommendation}>
      <div className={styles.recommendationContent}>
        <h3>{title}</h3>
        <div>{content}</div>
      </div>
    </Link>
  );
};

export default NavCard;
