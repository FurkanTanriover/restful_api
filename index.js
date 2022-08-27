const express = require("express");
require("./db/db_connection");
const catchError = require("./middleware/err_middleware");
const jwt = require("jsonwebtoken");

//routes

const app = express();

const userRouter = require("./router/user_router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ mesaj: "welcome" });
});
app.use(catchError);

function test(){
 const token= jwt.sign({_userID:"newuserid",isAdmin:true},"123456",{expiresIn:"2h"});
 console.log(token);

 const res=jwt.verify(token,"123456");
 console.log(res);
}

test();

app.listen("30022", () => {
  console.log("server 30022 portundan ayaklandırıldı");
});
