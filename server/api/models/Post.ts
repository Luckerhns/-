import { DataTypes } from "sequelize";
import database from "../../database";

export const Post = database.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: { type: DataTypes.STRING},
  work: { type: DataTypes.STRING}
});