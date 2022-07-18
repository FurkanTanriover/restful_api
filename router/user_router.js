const router = require("express").Router();
const User = require("../models/user_model");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});

  res.json({ allUsers });
});

router.get("/:id", (req, res) => {
  res.json({ mesaj: `id'si ${req.params.id} olan kullanıcı getirildi` });
});

router.post("/", async (req, res) => {
  try {
    const addUser = new User(req.body);
    const resp = await addUser.save();

    return res.status(200).json({ data: "Eklendi" });
  } catch (err) {
    return res.status(404).json({ error: err, errorMessage: err.message });
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
