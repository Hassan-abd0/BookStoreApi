const express = require("express");
const router = express.Router();
const {
  verifyaTokenAndAuthorizationAdmin,
} = require("../middleware/verifyToken");
const {
  createNewAuthor,
  getAllAuthor,
  getAuthorById,
  updateAutor,
  deleteAuthor,
} = require("../controllers/authorController");

router
  .route("/")
  .get(getAllAuthor)
  .post(verifyaTokenAndAuthorizationAdmin, createNewAuthor);

router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyaTokenAndAuthorizationAdmin, updateAutor)
  .delete(verifyaTokenAndAuthorizationAdmin, deleteAuthor);

module.exports = router;
