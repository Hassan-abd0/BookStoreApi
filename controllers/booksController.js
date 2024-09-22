const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");


const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice, authorName } = req.query;
  let booksList;
  if (minPrice && maxPrice) {
    booksList = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    booksList = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }

  res.status(200).json(booksList);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author", [
    "_id",
    "firstName",
    "lastName",
  ]);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "book not found",
    });
  }
});
const createNewBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await book.save();
  res.status(201).json(result);
});
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
});
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json({ message: "Book deleted successfully", book });
});
module.exports = {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
};
