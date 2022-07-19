const express = require("express");
require("./db/db_connection");

//routes

const userRouter = require("./router/user_router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

app.listen("30022", () => {
  console.log("server 30022 portundan ayaklandırıldı");
});

app.get("/", (req, res) => {
  res.status(200).json({ mesaj: "hoşgeldiniz" });
});
