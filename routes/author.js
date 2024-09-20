const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateteAuthors,
  validateUpdateAuthors,
} = require("../models/Author");
const {
  verifyaTokenAndAuthorizationAdmin,
} = require("../middleware/verifyToken");

/*
 * @desc Get all authors
 *@route /api/authors
 *@method GET
 *@access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorsList = await Author.find();
    res.status(200).json(authorsList);
  })
);
//end

/*
 * @desc Get authors by id
 *@route /api/authors/:id
 *@method GET
 *@access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({
        message: "authors not found",
      });
    }
  })
);
//end

/*
 * @desc Create new authors
 *@route /api/authors
 *@method POST
 *@access private(only admin)
 */
router.post(
  "/",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
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
  })
);
//end

/*
 * @desc Update authors
 *@route /api/authors/:id
 *@method PUT
 *@access private(only admin)
 */
router.put(
  "/:id",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
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
  })
);
//end

/*
 * @desc Delete authors
 *@route /api/authors/:id
 *@method DELETE
 *@access private(only admin)
 */
router.delete(
  "/:id",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully", author });
  })
);

//end

module.exports = router;
