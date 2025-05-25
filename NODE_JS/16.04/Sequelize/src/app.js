import express from "express";
import sequelize from "./config/db.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hallo sequilise");
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the DB");
    console.log(`server is running on PORT ${PORT}`);
  } catch (error) {
    console.error("unable to connect to the db: ", error);
  }
});