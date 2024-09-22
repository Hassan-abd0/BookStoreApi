const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
} = require("../models/User");

const newRegister = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "This user is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await user.save();
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  const { password, ...other } = result._doc;
  res.status(201).json({ ...other, token });
});

const login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  const { password, ...other } = user._doc;
  res.status(200).json({ ...other, token });
});

const UpdateUser = asyncHandler(async (req, res) => {
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
});

const GetAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

const GetUserById = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select("-password");
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const DeleteUserById = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id).select("-password");
  if (users) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "user has been deleted successfuly" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = {
  newRegister,
  login,
  DeleteUserById,
  GetAllUser,
  GetUserById,
  UpdateUser,
};
