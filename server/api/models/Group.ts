import database from "../../database";

export const Group = database.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});