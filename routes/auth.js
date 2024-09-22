const express = require("express");
const router = express.Router();

const {login,newRegister}=require("../controllers/userController")

router.post(
  "/register",
 newRegister
);



router.post(
  "/login",
  login
);

module.exports = router;
