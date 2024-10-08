const mongoose = require("mongoose");
const joi = require("joi");
const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ["soft cover", "hard cover"],
    },
  },
  { timestamps: true }
);
//Book Model
const Book = mongoose.model("Book", BookSchema);

//validation create book
function validateUpdateBook(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(250).required(),
    author: joi.string().required(),
    description: joi.string().trim().min(5).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().valid("soft cover", "hard cover").required(),
  });

  return schema.validate(obj);
}
//end
//validation create book
function validateCreateBook(obj) {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(250).required(),
    author: joi.string().required(),
    description: joi.string().trim().min(5).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().valid("soft cover", "hard cover").required(),
  });

  return schema.validate(obj);
}
//end

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
