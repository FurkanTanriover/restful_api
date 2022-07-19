const router = require("express").Router();
const user = require("../models/user_model");
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
});

router.patch("/:id", async (req, res) => {
  try {
    const resp = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    if (resp) {
      return res.status(200).json({ data: "User updated successfully" });
    } else {
      return res.status(404).json({ data: "User not found" });
    }
  } catch (err) {
    return res.status(404).json({ error: err, errorMessage: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resp = await User.findByIdAndDelete({ _id: req.params.id });
    if (resp) {
      return res.status(200).json({ data: "User deleted succesfully" });
    } else {
      return res.status(404).json({ data: "User not found" });
    }
  } catch (err) {
    return res.status(404).json({ error: err, errorMessage: err.message });
  }
});

module.exports = router;
