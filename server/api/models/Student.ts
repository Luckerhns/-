import { DataTypes, Sequelize } from "sequelize";
import database from "../../database";

export const Student = database.define("student", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  patronymic: DataTypes.STRING,
  activationLink: { type: DataTypes.STRING },
  groupName: { type: DataTypes.STRING, defaultValue: "" },
  course: { type: DataTypes.INTEGER, defaultValue: 0 },
  role: { type: DataTypes.STRING, defaultValue: "STUDENT" },
});
