const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/restful_api", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("veritabanına bağlanıldı"))
  .catch((err) => console.log("sorun oluştu" + err));
