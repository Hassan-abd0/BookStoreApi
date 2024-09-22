const express = require("express");
const router = express.Router();
const {
  verifyToken,
  verifyaTokenAndAuthorizationUser,
  verifyaTokenAndAuthorizationAdmin,
} = require("../middleware/verifyToken");
const {
  DeleteUserById,
  GetAllUser,
  GetUserById,
  UpdateUser,
} = require("../controllers/userController");



router.get("/", verifyaTokenAndAuthorizationAdmin, GetAllUser);

router
  .route("/:id")
  .put(verifyaTokenAndAuthorizationUser, UpdateUser)
  .get(verifyaTokenAndAuthorizationUser, GetUserById)
  .delete(verifyaTokenAndAuthorizationUser, DeleteUserById);
module.exports = router;
