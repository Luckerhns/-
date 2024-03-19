import { FC, useEffect, useState } from "react";
import Form from "../../../components/UI/Form/Form";
import styles from "../../../styles/components/Form/RegistrationForm.module.scss";
import FormGroup from "../../../components/UI/Form/FormGroup";
import MainLayout from "../../../Layout/MainLayout";
import authBackground from "../../../images/authBackground.jpg";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutesEnum } from "../../../utils/consts";
import { useActions } from "../../../hooks/useActions";
import Background from "../../../components/UI/Background";

const LoginPage: React.FC = () => {
  const { openModal, setLightTheme, setDarkTheme, CloseBurger } = useActions();
  const navigate = useNavigate();

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

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormErrors = {
      email: "",
      password: "",
    };

    if (!formState.email) {
      newFormErrors.email = "Введите почту";
    }

    if (!formState.password) {
      newFormErrors.password = "Введите пароль";
    }

    setFormErrors(newFormErrors);

    if (Object.values(newFormErrors).every((error) => !error)) {
      // Handle successful form submission here
      console.log("Form submitted successfully:", formState);
    }
  };

  return (
    <div className={styles.registrationFormContainer}>
      <div className={styles.leftImage}>
        <img src={authBackground} />
      </div>
      <Form
        onSubmit={(e) => handleFormSubmit(e)}
        className={styles.registrationForm}
      >
        <div className={styles.closeBtn}>
          <a onClick={() => openPage(PublicRoutesEnum.MainPath, false)}>
            Вернуться
          </a>
        </div>
        <div className={styles.formTitle}>
          <h1>Станьте студентом</h1>
          <p>зарегистрируйтесь чтобы начать</p>
        </div>
        <FormGroup
          label="Почта"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          error={formErrors.email}
          className={styles.formGroup}
        />
        <FormGroup
          label="Пароль"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          error={formErrors.password}
          className={styles.formGroup}
        />
        <div className={styles.formActions}>
          <div>
            Еще нет аккаунта? - <Link to={PublicRoutesEnum.RegistrationPath}>зарегистрироваться</Link>
          </div>
          <div className={styles.toLogin}></div>
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </div>
      </Form>
      <Background />
    </div>
  );
};

export default LoginPage;
