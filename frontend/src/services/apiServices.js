import { apiGenerators } from "../helpers/apiGenerators";

const BASE_URL = "http://localhost:5000";

// category

export const {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = apiGenerators("categories", "category", {
  getAll: false,
  getSingle: false,
  add: true,
  update: true,
  delete: true,
});

// subCategory

export async function getAllSubCategoriesByCategory(id) {
  const response = await fetch(`${BASE_URL}/subCategories/category/${id}`);
  const data = await response.json();
  return data;
}

export const {
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = apiGenerators("subCategories", "subCategory", {
  getAll: false,
  getSingle: false,
  add: true,
  update: true,
  delete: true,
});

// product

export async function getAllProducts(filters = {}) {
  let url = `${BASE_URL}/products?`;

  let queryPara = [];

  if (filters.category) {
    queryPara.push(`category=${filters.category}`);
  }

  if (filters.subCategory) {
    queryPara.push(`subCategory=${filters.subCategory}`);
  }

  if (filters.trending) {
    queryPara.push(`trending=${filters.trending}`);
  }

  if (queryPara.length) {
    queryPara = queryPara.join("&");
  }

  url += queryPara;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductBySlug(slug) {
  const response = await fetch(`${BASE_URL}/products/single/${slug}`);
  const data = await response.json();
  return data;
}

export const { getProduct, addProduct, updateProduct, deleteProduct } =
  apiGenerators("products", "product", {
    getSingle: false,
    add: true,
    update: true,
    delete: true,
  });

// page

export async function getPageBySlug(slug) {
  const response = await fetch(`${BASE_URL}/pages/single/${slug}`);
  const data = await response.json();
  return data;
}

export const { getAllPages, getPage, addPage, updatePage, deletePage } =
  apiGenerators("pages", "page", {
    getAll: false,
    getSingle: false,
    add: true,
    update: true,
    delete: true,
  });

// user

export async function checkUser() {
  const response = await fetch(`${BASE_URL}/users/checkUser`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function verifyEmail(userId, token) {
  const response = await fetch(
    `${BASE_URL}/users/verifyEmail?token=${token}&userId=${userId}`
  );
  const data = await response.json();
  return data;
}

export async function signUp(body) {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

export async function signIn(body) {
  const response = await fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

export async function signOut() {
  const response = await fetch(`${BASE_URL}/users/signout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}

export const { getAllUsers, getUser, addUser, updateUser, deleteUser } =
  apiGenerators("users", "user", {
    getAll: true,
    getSingle: true,
    update: true,
    delete: true,
  });

export const {
  getAllFilters,
  getFilter,
  addFilter,
  updateFilter,
  deleteFilter,
} = apiGenerators("filters", "filter", {
  getAll: false,
  getSingle: false,
  add: true,
  update: true,
  delete: true,
});
