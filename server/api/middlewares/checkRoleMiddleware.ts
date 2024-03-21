import { verify } from "jsonwebtoken";
import ErrorException from "../errors/ErrorException";
import TokenService from "../services/dependencies/Token.service";

export default function (role) {
  return async function (req, res, next) {
    if (req.method === "Options") {
      next();
    }
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(
          ErrorException.UnauthorizedError("Нету хедера авторизации").message
        );
      }
      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ErrorException.UnauthorizedError("Нету токена").message);
      }

      const userData = TokenService.validateAccessToken(accessToken);

      if (!userData) {
        return next(
          ErrorException.UnauthorizedError("Неправильный токен").message
        );
      }

      req.user = userData;
      console.log("Удачная проверка авторизации");

      // console.log(req.headers.authorization);

      next();
    } catch (error) {
      next(
        ErrorException.UnauthorizedError("Ошибка при проверке роли").message
      );
    }
  };
}
