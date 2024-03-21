import database from "./database";
import Express, { json } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from 'cors'
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(json());
app.use("/api", router);

// Initialize the server and start it listening

const start = async () => {
  try {
    await database.authenticate();
    // await database.sync({force: true, alter: true});
    await database.sync();

    app.listen(PORT, () => {
      console.log("Connection has been established successfully ->", PORT);
    });
  } catch (error) {
    console.log("Error", error);
  }
};

start();
