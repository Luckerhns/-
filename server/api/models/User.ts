import database from "../../database";

export const User = database.define("User", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  patronymic: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
