import { $user } from ".";
import jwt_decode from "jwt-decode";
import getErrorByStatus from "../utils/functions";
import { IUser } from "../types/types";
import { Axios } from "axios";

export const registration = async (dto: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  patronymic: string;
}) => {
  const { data } = await $user.post("api/auth/registration", {
    email: dto.email,
    password: dto.password,
    firstname: dto.firstname,
    lastname: dto.lastname,
    patronymic: dto.patronymic,
  });
  return data;
};

export const login = async (dto: { email: string; password: string }) => {
  const { data } = await $user.post("api/auth/login", {
    email: dto.email,
    password: dto.password,
  });
  return data;
};
