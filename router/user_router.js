const router = require("express").Router();
const User = require("../models/user_model");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});

  res.json({allUsers});
});

router.get("/:id", (req, res) => {
  res.json({ mesaj: `id'si ${req.params.id} olan kullanıcı getirildi` });
});

router.post("/", async (req, res) => {
    try {
        const addUser=new User(req.body);
        const resp=await addUser.save();
//        res.send(resp);
        res.status(200).json({ data: resp });
    } catch (error) {
        res.status(400).json({ error: error, errorMessage: "Internal server error" }); 
                // console.log(`user kaydedilirken hata oluştu ${error}`);
    }
    res.json(req.body);
});

router.patch("/:id", (req, res) => {
  res.json(req.body);
});

router.delete("/:id", (req, res) => {
  res.json({ mesaj: `id'si ${req.params.id} olan kullanıcı silinecek` });
});

module.exports = router;
