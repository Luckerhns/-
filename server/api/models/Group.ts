import { DataTypes } from "sequelize";
import database from "../../database";

export const Group = database.define("group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  group: DataTypes.STRING,
  description: DataTypes.STRING,
  course: DataTypes.INTEGER,
});