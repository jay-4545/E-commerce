const express = require("express");
const {
  getAllPages,
  getPage,
  addPage,
  updatePage,
  deletePage,
  getPageBySlug,
} = require("../controllers/pageController");
const { authenticateAdmin } = require("../middlewares/authentication");
const pageRouter = express.Router();

pageRouter.get("/", getAllPages);
pageRouter.get("/:id", getPage);
pageRouter.get("/single/:slug", getPageBySlug);
pageRouter.post("/", authenticateAdmin, addPage);
pageRouter.patch("/:id", authenticateAdmin, updatePage);
pageRouter.delete("/:id", authenticateAdmin, deletePage);

module.exports = pageRouter;
