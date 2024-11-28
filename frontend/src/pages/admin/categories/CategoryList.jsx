import React from "react";
import AdminTitlePage from "../../../components/admin/common/AdminTitlePage";
import CommonList from "../../../components/common/CommonList";
import {
  deleteCategory,
  getAllCategories,
} from "../../../services/apiServices";

function CategoryList() {
  return (
    <div>
      <AdminTitlePage
        text="Categories"
        hasBtn
        btnText="Add Category"
        btnLink="/admin/categories/add"
      />
      <div>
        <CommonList
          getAllData={getAllCategories}
          deleteData={deleteCategory}
          entity="categories"
          fields={{ image: "image", title: "name", subTitle: "" }}
        />
      </div>
    </div>
  );
}

export default CategoryList;
