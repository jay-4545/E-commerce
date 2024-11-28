const Product = require("../model/Product");
const productValidator = require("../validators/productValidator");
const path = require("path");
const fs = require("fs/promises");
const {
  errorMsgRes,
  successsDataRes,
  successMsgRes,
} = require("../utils/responseUtils");
const {
  addFiles,
  checkAndCreateDir,
  addSingleFile,
  deleteFiles,
} = require("../utils/fileUtils");
const { minTwoFilesValidator } = require("../validators/commonValidators");
const Category = require("../model/Category");
const SubCategory = require("../model/SubCategory");

const getAllProducts = async (req, res) => {
  try {
    const { category, subCategory, trending } = req.query;

    const filters = {};

    if (category) {
      const foundCategory = await Category.findOne({ slug: category });
      if (foundCategory) {
        filters.category = foundCategory._id;
      }
    }

    if (subCategory) {
      const foundSubCategory = await SubCategory.findOne({ slug: subCategory });
      if (foundSubCategory) {
        filters.subCategory = foundSubCategory._id;
      }
    }

    if (trending) {
      filters.isTrending = true;
    }

    const products = await Product.find(filters).populate([
      "category",
      "subCategory",
    ]);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ success: false, msg: "No Such product found!" });
    } else {
      res.status(200).json({ success: true, data: product });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) {
      res.status(404).json({ success: false, msg: "No Such product found!" });
    } else {
      res.status(200).json({ success: true, data: product });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    await productValidator(req.body);

    req.body.images = await addFiles(req.files.images, "products");

    const product = await Product.create(req.body);
    successsDataRes(res, product);
  } catch (error) {
    errorMsgRes(res, error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const exitingProduct = await Product.findById(id);

    if (!exitingProduct) {
      return errorMsgRes(res, "No such product found!", 404);
    }

    await productValidator(req.body, id);

    minTwoFilesValidator(req.files?.images, req.body.images);

    if (!req.body.images) {
      req.body.images = [];
    } else if (req.body.images && !Array.isArray(req.body.images)) {
      req.body.images = [req.body.images];
    }

    const images = [];

    if (req.files?.images) {
      if (Array.isArray(req.files.images)) {
        const urls = await addFiles(req.files.images, "products");
        images.concat(urls);
      } else {
        const url = await addSingleFile(req.files.images, "products");
        images.push(url);
      }
    }

    await deleteFiles(exitingProduct.images, "products", req.body.images);

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      ...req.body,
      images: [...images, ...req.body.images],
    });

    successsDataRes(res, updatedProduct);
  } catch (error) {
    errorMsgRes(res, error.message, error.status || 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const exitingProduct = await Product.findById(id);

    if (!exitingProduct) {
      return res
        .status(404)
        .json({ success: false, msg: "No such Product exists!" });
    }

    await deleteFiles(exitingProduct.images, "products");

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, msg: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getProductBySlug,
  addProduct,
  updateProduct,
  deleteProduct,
};
