const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateteAuthors,
  validateUpdateAuthors,
} = require("../models/Author");

const getAllAuthor = asyncHandler(async (req, res) => {
  const { pageName } = req.query;
  const authorsPerPage = 2;
  const authorsList = await Author.find()
    .skip((pageName - 1) * authorsPerPage)
    .limit(authorsPerPage);
  res.status(200).json(authorsList);
});
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({
      message: "authors not found",
    });
  }
});
const createNewAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateteAuthors(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
  });
  const result = await author.save();
  res.status(201).json(result);
});
const updateAutor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthors(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  );
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.status(200).json(author);
});
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }
  res.status(200).json({ message: "Author deleted successfully", author });
});
module.exports = {
  getAllAuthor,
  getAuthorById,
  createNewAuthor,
  updateAutor,
  deleteAuthor,
};
