const router = require("express").Router();
const User = require("../models/user_model");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});

  res.json({ allUsers });
});

router.get("/:id", async (req, res) => {
  const findUser = await User.findById({ _id: req.params.id });
  console.log(findUser);
  if (findUser.name !== null) {
    res.json({ mesaj: `id'si ${req.params.id} olan ${findUser.name} getirildi` });
  } else {
    res.json({ mesaj: `id'si ${req.params.id} ye sahip bir kullanıcı bulunmamaktadır` });
  }
});

//add user route
router.post("/", async (req, res, next) => {
  try {
    const addUser = new User(req.body);
    addUser.password = await bcrypt.hash(addUser.password, 10);
    const { error, value } = addUser.joiValidation(req.body);
    if (error) {
      next(createError(400, error));
    } else {
      const resp = await addUser.save();
      return res.status(200).json({ data: "Eklendi" });
    }
  } catch (err) {
    return next(err);
  }
});

//update user route
router.patch("/:id", async (req, res, next) => {
  const { error, value } = User.joiValidationForUpdate(req.body);

  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  {
    if (error) {
      next(createError(400, error));
    } else {
      try {
        const resp = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
        if (resp) {
          return res.status(200).json({ data: "User updated successfully" });
        } else {
          return res.status(404).json({ data: "User not found" });
        }
      } catch (err) {
        return next(createError(err));
      }
    }
  }
});

//delete user route
router.delete("/:id", async (req, res, next) => {
  try {
    const resp = await User.findByIdAndDelete({ _id: req.params.id });
    if (resp) {
      return res.status(200).json({ data: "User deleted succesfully" });
    } else {
      throw createError(400, "User not found");
    }
  } catch (err) {
    return next(err);
  }
});

//login user route
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
