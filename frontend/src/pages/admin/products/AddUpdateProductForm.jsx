import { CheckBox } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitlePage from "../../../components/admin/common/AdminTitlePage";
import MyFileUpload from "../../../components/admin/common/MyFileUpload";
import {
  addProduct,
  getAllCategories,
  getAllSubCategories,
  getProduct,
  updateProduct,
} from "../../../services/apiServices";

function AddUpdateProductForm() {
  const { id } = useParams();

  const isAdd = id === "add";
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    isAdd
      ? {
          name: "",
          slug: "",
          desc: "",
          images: [],
          price: "",
          discountPercentage: "",
          taxPercentage: "",
          shippingFee: "",
          category: "",
          subCategory: "",
          qty: "",
          isTrending: false,
        }
      : null
  );
  const [imagesURL, setImagesURL] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!isAdd) {
      getProduct(id).then((data) => {
        setFormState(data.data);
        setImagesURL(data.data.images);
      });
    }
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((result) => {
        setCategories(
          result.data.map((value) => {
            return { value: value._id, name: value.name };
          })
        );
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
    getAllSubCategories()
      .then((result) => {
        const { data } = result;
        const temp = data.map((value) => {
          return {
            value: value._id,
            name: value.name,
            category: value.categoryId._id,
          };
        });
        setSubCategories(temp);
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  }, []);

  function handleChange(e) {
    if (e.target.name === "name") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        slug: e.target.value.toLowerCase().replaceAll(" ", "-"),
      });
    } else if (e.target.name === "isTrending") {
      setFormState({ ...formState, [e.target.name]: e.target.checked });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in formState) {
      if (Array.isArray(formState[key])) {
        for (const value of formState[key]) {
          formData.append(key, value);
        }
      } else {
        formData.append(key, formState[key]);
      }
    }
    try {
      if (isAdd) {
        await addProduct(formData);
        alert("Product Added!");
      } else {
        await updateProduct(id, formData);
        alert("Product Updated!");
      }
      navigate("/admin/products");
    } catch (error) {
      alert(error.message);
    }
  }

  if (!formState) return null;

  return (
    <div>
      <AdminTitlePage text={(isAdd ? "Add" : "Update") + " Product"} />
      <Paper
        component={"form"}
        className="p-4 mt-8 gap-4 grid grid-cols-1"
        variant="outlined"
        onSubmit={handleSubmit}
      >
        <MyFileUpload
          imagesURL={imagesURL}
          setImagesURL={setImagesURL}
          formState={formState}
          setFormState={setFormState}
        />

        <Paper
          variant="outlined"
          className="flex flex-col gap-4 overflow-hidden w-full p-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="name"
              label="Product Name"
              variant="outlined"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
            <TextField
              id="slug"
              label="Product Slug"
              variant="outlined"
              name="slug"
              value={formState.slug}
            />
          </div>
          <TextField
            id="desc"
            label="Product Description"
            name="desc"
            multiline
            maxRows={4}
            variant="outlined"
            onChange={handleChange}
            value={formState.desc}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                label="Category"
                name="category"
                value={formState.category}
                onChange={handleChange}
              >
                {categories?.map((category) => {
                  return (
                    <MenuItem key={category.value} value={category.value}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="subCategory-label">Sub Category</InputLabel>
              <Select
                disabled={!formState.category}
                labelId="subCategory-label"
                id="subCategory"
                name="subCategory"
                label="Sub Category"
                value={formState.subCategory}
                onChange={handleChange}
              >
                {subCategories
                  ?.filter((subCategory) => {
                    return subCategory.category === formState.category;
                  })
                  .map((subCategory) => {
                    return (
                      <MenuItem
                        key={subCategory.value}
                        value={subCategory.value}
                      >
                        {subCategory.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              id="price"
              label="Product Price"
              name="price"
              variant="outlined"
              onChange={handleChange}
              value={formState.price}
            />
            <TextField
              id="qty"
              name="qty"
              label="Quantity"
              variant="outlined"
              onChange={handleChange}
              value={formState.qty}
              type="number"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              id="discountPercentage"
              name="discountPercentage"
              label="Discount Percentage"
              onChange={handleChange}
              variant="outlined"
              value={formState.discountPercentage}
              type="number"
            />
            <TextField
              id="taxPercentage"
              name="taxPercentage"
              label="Tax Percentage"
              onChange={handleChange}
              variant="outlined"
              value={formState.taxPercentage}
              type="number"
            />
            <TextField
              id="shippingFee"
              label="Shipping Fee"
              name="shippingFee"
              variant="outlined"
              onChange={handleChange}
              value={formState.shippingFee}
              type="number"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <CheckBox
                  name="isTrending"
                  checked={formState.isTrending}
                  onChange={handleChange}
                />
              }
              label="Is Trending"
            />
          </div>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}

export default AddUpdateProductForm;
