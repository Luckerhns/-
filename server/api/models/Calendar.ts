import { DataTypes } from "sequelize";
import database from "../../database";

export const Calendar = database.define("calendar", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  calendar: DataTypes.JSON,
});
