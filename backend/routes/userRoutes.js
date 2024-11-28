const express = require("express");
const {
  updateUser,
  deleteUser,
  singIn,
  singOut,
  getAllUsers,
  getUser,
  singUp,
  varifyEmail,
  checkUser,
} = require("../controllers/usersController");
const {
  authenticateUser,
  authenticateAdmin,
} = require("../middlewares/authentication");

const userRouter = express.Router();

userRouter.post("/signup", singUp);
userRouter.post("/signin", singIn);
userRouter.get("/signout", authenticateUser, singOut);
userRouter.get("/verifyEmail", varifyEmail);
userRouter.get("/checkUser", authenticateUser, checkUser);
userRouter.get("/", authenticateAdmin, getAllUsers);
userRouter.get("/:id", authenticateUser, getUser);
userRouter.patch("/:id", authenticateUser, updateUser);
userRouter.delete("/:id", authenticateAdmin, deleteUser);

module.exports = userRouter;
