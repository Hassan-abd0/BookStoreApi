const mongoose = require("mongoose");
const joi = require("joi");
const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);
//Author Model
const Author = mongoose.model("Author", AuthorSchema);

//validation update authors
function validateUpdateAuthors(obj) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(200).required(),
    lastName: joi.string().trim().min(3).max(200).required(),
    nationality: joi.string().trim().min(3).max(200).required(),
    image: joi.string().trim().required(),
  });

  return schema.validate(obj);
}
//end
//validation create authors
function validateCreateteAuthors(obj) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(200).required(),
    lastName: joi.string().trim().min(3).max(200).required(),
    nationality: joi.string().trim().min(3).max(200).required(),
    image: joi.string().trim().required(),
  });

  return schema.validate(obj);
}
//end

module.exports = { Author, validateUpdateAuthors, validateCreateteAuthors };
