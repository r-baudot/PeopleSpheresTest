import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductForm } from "./ProductForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateProductForm } from "../../../store/actions/products";

const UpdateFormContainer = () => {
  const productsStore = useSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = productsStore.filter((product) => {
    return +product.id == +productId;
  });

  if (!product) {
    return null;
  }

  const saveProduct = (updatedProduct) => {
    dispatch(updateProductForm(updatedProduct, productId, navigate));
  };

  return (
    <>
      <Link to="/">Home</Link>
      <ProductForm onSave={saveProduct} product={product[0]} />
    </>
  );
};

export default UpdateFormContainer;
