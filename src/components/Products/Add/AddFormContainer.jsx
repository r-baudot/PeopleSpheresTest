import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProductForm } from "../Update/ProductForm";
import { createProductForm } from "../../../store/actions/products";

const AddFormContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveProduct = (data) => {
    dispatch(createProductForm(data, navigate));
  };

  return (
    <>
      <Link to="/">Home</Link>
      <ProductForm onSave={saveProduct} />
    </>
  );
};

export default AddFormContainer;
