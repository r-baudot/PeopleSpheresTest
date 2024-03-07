import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import ProductsList from "./ProductsList";
import { deleteProduct } from "../../store/actions/products";
import { getCategoriesById } from "../../store/reducers/categories";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const productsWithCategories = useSelector((state) => {
    const categoriesById = getCategoriesById(state);
    return state.products.map((product) => ({
      ...product,
      categories: product.categories.map((id) => categoriesById[id]),
    }));
  });

  return (
    <>
      <Header name="Products" />
      <ProductsList
        products={productsWithCategories}
        onDelete={(id) => dispatch(deleteProduct(id))}
      />
    </>
  );
};

export default ProductsContainer;
