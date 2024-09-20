const mongoose = require("mongoose");
const joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//User Model
const User = mongoose.model("User", UserSchema);

//validation register authors
function validateRegisterUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required(),
    username: joi.string().trim().min(2).max(100).required(),
    password: joi.string().trim().min(5).required(),
  });

  return schema.validate(obj);
}
//end

//validation login authors
function validateLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required(),
    password: joi.string().trim().min(5).required(),
  });

  return schema.validate(obj);
}
//end

//validation update authors
function validateUpdateUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100),
    username: joi.string().trim().min(2).max(100),
    password: joi.string().trim().min(5),
  });

  return schema.validate(obj);
}
//end

module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
};
