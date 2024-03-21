import CustomCalendar from "../components/CustomCalendar";
import AboutmePage from "../pages/ru/AboutmePage";
import AdminPage from "../pages/ru/AdminPage";
import AdminRecords from "../pages/ru/AdminRecordsPage";
import LoginPage from "../pages/ru/Auth/LoginPage";
import RegistrationPage from "../pages/ru/Auth/RegistrationPage";
import MainPage from "../pages/ru/MainPage";
import ProfilePage from "../pages/ru/ProfilePage";
import BookPage from "../pages/ru/BookPage";
import TherapyPage from "../pages/ru/TherapyPage";
import AgreePage from "../pages/ru/license/AgreePage";
import PoliticyPage from "../pages/ru/license/PoliticyPage";
import { IRoute } from "../types/routes";
import { PrivateRoutesEnum, PublicRoutesEnum } from "./consts";

export const publicRoutes: IRoute[] = [
  { path: PrivateRoutesEnum.MainPath, element: MainPage },
  { path: PublicRoutesEnum.AgreePath, element: AgreePage },
  { path: PublicRoutesEnum.PoliticyPath, element: PoliticyPage },
  { path: PublicRoutesEnum.RegistrationPath, element: RegistrationPage },
  { path: PublicRoutesEnum.LoginPath, element: LoginPage },
];

export const privateRoutes = [
  { path: PrivateRoutesEnum.MainPath, element: MainPage },
  { path: PrivateRoutesEnum.AgreePath, element: AgreePage },
  { path: PrivateRoutesEnum.PoliticyPath, element: PoliticyPage },
  { path: PrivateRoutesEnum.ProfilePath, element: ProfilePage },
  { path: PrivateRoutesEnum.BookPath, element: BookPage },
];

export const adminRoutes = [
  { path: PrivateRoutesEnum.BookPath, element: BookPage },
  { path: PrivateRoutesEnum.MainPath, element: MainPage },
  { path: PrivateRoutesEnum.MainPath, element: MainPage },
  { path: PrivateRoutesEnum.AgreePath, element: AgreePage },
  { path: PrivateRoutesEnum.PoliticyPath, element: PoliticyPage },
  { path: PrivateRoutesEnum.ProfilePath, element: ProfilePage },
];
