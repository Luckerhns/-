import { DataTypes, Sequelize } from "sequelize";
import database from "../../database";

export const Student = database.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  patronymic: DataTypes.STRING,
  role: DataTypes.STRING,
});
