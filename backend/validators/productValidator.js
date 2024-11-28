const Product = require("../model/Product");
const MyError = require("../utils/errorUtils");

const productValidator = async (body, id) => {
  if (!body.name) {
    throw new MyError("Name is required!", 400);
  }

  if (!body.slug) {
    throw new MyError("Slug is required!", 400);
  }

  if (!body.desc) {
    throw new MyError("Description is required!", 400);
  }

  if (!body.price) {
    throw new MyError("Price is required!", 400);
  }

  if (!body.category) {
    throw new MyError("Category is required!", 400);
  }

  if (!body.subCategory) {
    throw new MyError("Sub-category is required!", 400);
  }

  if (body.desc?.trim().length < 20) {
    throw new MyError("Description must be atleat 20 characters!", 400);
  }

  if (id) {
    const exitingProductById = await Product.findById(id);
    const exitingProductBySlug = await Product.findOne({ slug: body.slug });

    if (
      exitingProductById &&
      exitingProductBySlug &&
      exitingProductById.slug !== exitingProductBySlug.slug
    ) {
      throw new MyError("Product slug is already exists!", 400);
    }
  } else {
    const exitingProduct = await Product.findOne({ slug: body.slug });
    if (exitingProduct) {
      throw new MyError("Product slug is already exists!", 400);
    }
  }
};

module.exports = productValidator;
