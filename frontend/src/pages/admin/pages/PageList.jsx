import React from "react";
import AdminTitlePage from "../../../components/admin/common/AdminTitlePage";
import CommonList from "../../../components/common/CommonList";
import { deletePage, getAllPages } from "../../../services/apiServices";

function PageList() {
  return (
    <div>
      <AdminTitlePage
        text="Pages"
        hasBtn
        btnText={"Add Pages"}
        btnLink="/admin/pages/add"
      />
      <div>
        <CommonList
          getAllData={getAllPages}
          deleteData={deletePage}
          entity="pages"
          fields={{ title: "name", subTitle: "" }}
          renderImage={(item) => {
            return item.images[0];
          }}
        />
      </div>
    </div>
  );
}

export default PageList;
