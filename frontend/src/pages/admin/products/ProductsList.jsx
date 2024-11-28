import React from "react";
import AdminTitlePage from "../../../components/admin/common/AdminTitlePage";
import CommonList from "../../../components/common/CommonList";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";

function ProductsList() {
  function renderImage(item) {
    return item.images[0];
  }

  return (
    <div>
      <AdminTitlePage
        text="Products"
        hasBtn
        btnText={"Add Products"}
        btnLink="/admin/products/add"
      />
      <div>
        <CommonList
          getAllData={getAllProducts}
          deleteData={deleteProduct}
          entity="products"
          fields={{ title: "name", subTitle: "desc" }}
          renderImage={renderImage}
        />
      </div>
    </div>
  );
}

export default ProductsList;
