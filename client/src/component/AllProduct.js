import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

function AllProduct({ heading }) {
  const productData = useSelector((state) => state.product.productList);
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState(productData);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setFilterBy(category);

    setDataFilter(() => {
      return [...filter];
    });
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] &&
          categoryList.map((el) => {
            return (
              <Filter
                category={el}
                key={el}
                isActive={el === filterby}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })}
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-4">
        {dataFilter.map((el) => {
          return (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AllProduct;
