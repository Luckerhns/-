import { verify } from "jsonwebtoken";
import TokenService from "../services/dependencies/Token.service";
import ErrorException from "../errors/ErrorException";

export default function (role) {
  return async function (req, res, next) {
    if (req.method === "Options") {
      next();
    }
    try {
      const { isAdmin } = req.body;
      if (!isAdmin) {
        return next(ErrorException.UnauthorizedError("You have no access"));
      }

      // const userRole = verify(token, process.env.JWT_ACCESS_SECRET);

      // const userDto = await TokenService.validateAccesToken(token);

      // if (userDto.role !== role) {
      //   return next(ErrorException.Forbidden("You have no access"));
      // }

      next();
    } catch (error) {
      return next(ErrorException.Forbidden("You dont have access"));
    }
  };
}
