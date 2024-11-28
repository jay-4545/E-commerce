const express = require("express");
const {
  getAllFilters,
  getFilter,
  addFilter,
  updateFilter,
  deleteFilter,
} = require("../controllers/filtersController");

const { authenticateAdmin } = require("../middlewares/authentication");

const filterRouter = express.Router();

filterRouter.get("/", getAllFilters);
filterRouter.get("/:id", getFilter);
filterRouter.post("/", authenticateAdmin, addFilter);
filterRouter.patch("/:id", authenticateAdmin, updateFilter);
filterRouter.delete("/:id", authenticateAdmin, deleteFilter);

module.exports = filterRouter;
