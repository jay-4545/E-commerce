import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../services/apiServices";
import ProductCard from "../../components/main/common/ProductCard";
import SizesFilter from "../../components/main/productList/SizesFilter";
import PriceFilter from "../../components/main/productList/PriceFilter";
import ColorsFilter from "../../components/main/productList/ColorsFilter";

function ProductList() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const filters = {
      category: params.categorySlug,
      subCategory: params.subCategorySlug,
    };
    getAllProducts(filters).then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-[250px_1fr] gap-4 relative">
      <div>
        <div className="sticky top-0 left-0">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="flex flex-col gap-4">
            <SizesFilter />
            <ColorsFilter />
            <PriceFilter />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
