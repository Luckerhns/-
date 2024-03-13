import database from "./database";
import Express from "express";

const app = Express();
const PORT = process.env.PORT || 5000;

// Initialize the server and start it listening

const start = async () => {
  try {
    await database.authenticate();
    await database.sync();

    app.listen(PORT, () => {
      console.log("Connection has been established successfully ->", PORT);
    });
  } catch (error) {
    console.log("Error", error);
  }
};

start();
