const express = require("express");
const router = express.Router();
const {
  verifyaTokenAndAuthorizationAdmin,
} = require("../middleware/verifyToken");
const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} = require("../controllers/booksController");

router
  .route("/")
  .get( getAllBooks)
  .post( verifyaTokenAndAuthorizationAdmin, createNewBook);

router
  .route("/:id")
  .get( getBookById)
  .put(verifyaTokenAndAuthorizationAdmin, updateBook)
  .delete( verifyaTokenAndAuthorizationAdmin, deleteBook);


module.exports = router;
