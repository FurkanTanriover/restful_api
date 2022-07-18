const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://adnankurt:vmtmr2oa0vdOLfaa@cluster0.ur5gnxp.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log("veritabanına bağlanıldı"))
.catch(err=>console.log("sorun oluştu"+err));
