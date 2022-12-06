import express from "express";
import dotenv from "dotenv";
import connection from "./database/db.js";
import cors from "cors";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connection(username, password);
app.use("/clone", router);

app.use("/", (req, res) => {
  res.send("welcome to the server home page");
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
