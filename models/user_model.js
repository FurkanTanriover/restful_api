const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = mongoose.Schema(
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
    },
  },
  { collection: "users", timestamps: true }
);

//validate schema
const schema = Joi.object({
  name: Joi.string().max(30).min(3).trim(),
  username: Joi.string().max(30).min(3).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().trim(),
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

const user = mongoose.model("user", userSchema);

module.exports = user;
