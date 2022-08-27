const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
      minlength: 8,
      maxlength: 20,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength:6,
    },
  },
  { collection: "users", timestamps: true }
);

//validate schema
const schema = Joi.object({
  name: Joi.string().max(30).min(3).trim(),
  username: Joi.string().max(30).min(3).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().trim().min(6),
});

//user add schema
userSchema.methods.joiValidation = function (userObject) {
  schema.required();
  return schema.validate(userObject);
};

//user update
userSchema.statics.joiValidationForUpdate = function (userObject) {
  return schema.validate(userObject);
};

//user login
userSchema.statics.login = async (email, password) => {
  const { error, value } = schema.validate({ email, password });

  if (error) {
    throw createError(400, error);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(400, "Wrong email/password");
  }
  const passwordControl = await bcrypt.compare(password, user.password);

  if (!passwordControl) {
    throw createError(400, "Wrong email/password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
