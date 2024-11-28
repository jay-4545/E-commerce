import React from "react";
import AdminTitlePage from "../../../components/admin/common/AdminTitlePage";
import CommonList from "../../../components/common/CommonList";
import { deleteFilter, getAllFilters } from "../../../services/apiServices";

function FilterList() {
  return (
    <div>
      <AdminTitlePage
        text="Filters"
        hasBtn
        btnText="Add Filter"
        btnLink="/admin/filters/add"
      />
      <div>
        <CommonList
          getAllData={getAllFilters}
          deleteData={deleteFilter}
          entity="filters"
          fields={{ title: "name" }}
        />
      </div>
    </div>
  );
}

export default FilterList;
