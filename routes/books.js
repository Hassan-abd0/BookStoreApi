const express = require("express");
const router = express.Router();
const joi = require("joi");
const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");
const {
  verifyaTokenAndAuthorizationAdmin,
} = require("../middleware/verifyToken");
/*
 * @desc Get all books
 *@route /api/books
 *@method GET
 *@access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const booksList = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    res.status(200).json(booksList);
  })
);
//end

/*
 * @desc Get book by id
 *@route /api/books/:id
 *@method GET
 *@access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
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
  })
);
//end

/*
 * @desc Create new book
 *@route /api/books
 *@method POST
 *@access private(only admin)
 */
router.post(
  "/",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
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
  })
);
//end

/*
 * @desc Update book
 *@route /api/books/:id
 *@method PUT
 *@access private(only admin)
 */
router.put(
  "/:id",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
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
  })
);
//end

/*
 * @desc Delete book
 *@route /api/books/:id
 *@method DELETE
 *@access private(only admin)
 */
router.delete(
  "/:id",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", book });
  })
);

//end

module.exports = router;
