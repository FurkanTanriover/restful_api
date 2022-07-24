const express = require("express");
require("./db/db_connection");
const catchError = require("./middleware/err_middleware");

//routes

const app = express();

const userRouter = require("./router/user_router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

app.use(catchError);

app.get("/", (req, res) => {
  res.status(200).json({ mesaj: "hoşgeldiniz" });
});

app.listen("30022", () => {
  console.log("server 30022 portundan ayaklandırıldı");
});
