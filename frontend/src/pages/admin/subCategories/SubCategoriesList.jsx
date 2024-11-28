import React from "react";
import AdminTitlePage from "../../../components/admin/common/AdminTitlePage";
import CommonList from "../../../components/common/CommonList";
import {
  deleteSubCategory,
  getAllSubCategories,
} from "../../../services/apiServices";

function SubCategoriesList() {
  function renderSubtitle(item) {
    return item.categoryId.name;
  }

  return (
    <div>
      <AdminTitlePage
        text="Sub-Categories"
        hasBtn
        btnText={"Add Sub-Categories"}
        btnLink="/admin/subCategories/add"
      />
      <div>
        <CommonList
          getAllData={getAllSubCategories}
          deleteData={deleteSubCategory}
          entity="subCategories"
          fields={{ image: "image", title: "name", subTitle: "" }}
          renderSubtitle={renderSubtitle}
        />
      </div>
    </div>
  );
}

export default SubCategoriesList;
