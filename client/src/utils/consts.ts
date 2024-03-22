import { INavbarRoutesArray } from "../types/types";

export enum catalogPaths {}

export enum PublicRoutesEnum {
  MainPath = "/",
  RegistrationPath = "/registration",
  LoginPath = "/login",
  AgreePath = "/agree",
  PoliticyPath = "/politicy",
  AboutUsPath = "/AboutUsPath",
  ContactsPath = "/ContactsPath",
  NewsPath = "/NewsPath",
}

export enum PrivateRoutesEnum {
  MainPath = "/",
  AgreePath = "/agree",
  PoliticyPath = "/politicy",
  AdminPath = "/admin-path",
  ProfilePath = "/profile",
  RatingPath = "/rating",
  BookPath = "/book",
}

export const PublicNavbarRoutesArray: INavbarRoutesArray = [
  { path: PublicRoutesEnum.MainPath, pathName: "Главная", toProfile: false },
  {
    path: PublicRoutesEnum.LoginPath,
    pathName: "Войти",
    toProfile: false,
  },
];

export const PrivateNavbarRoutesArray: INavbarRoutesArray = [
  { path: PublicRoutesEnum.MainPath, pathName: "Главная" },
  {
    path: PrivateRoutesEnum.BookPath,
    pathName: "Дневник",
    toProfile: false,
  },
  {
    path: PrivateRoutesEnum.ProfilePath,
    pathName: "Профиль",
    toProfile: false,
  },
];
