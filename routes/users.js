const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const {
  verifyToken,
  verifyaTokenAndAuthorizationUser,
  verifyaTokenAndAuthorizationAdmin,
} = require("../middleware/verifyToken");

/*
 * @desc Update User
 *@route /api/user/:id
 *@method PUT
 *@access private
 */
router.put(
  "/:id",
  verifyaTokenAndAuthorizationUser,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details.message });
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  })
);
//end

/*
 * @desc Get all User
 *@route /api/user/
 *@method GET
 *@access private(only admin)
 */
router.get(
  "/",
  verifyaTokenAndAuthorizationAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  })
);
//end

/*
 * @desc Get User By Id
 *@route /api/user/:id
 *@method GET
 *@access private(only admin & user himself)
 */
router.get(
  "/:id",
  verifyaTokenAndAuthorizationUser,
  asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id).select("-password");
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
);
//end

/*
 * @desc Delete User By Id
 *@route /api/user/:id
 *@method DELETE
 *@access private(only admin & user himself)
 */
router.delete(
  "/:id",
  verifyaTokenAndAuthorizationUser,
  asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id).select("-password");
    if (users) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "user has been deleted successfuly" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
);
//end

module.exports = router;
