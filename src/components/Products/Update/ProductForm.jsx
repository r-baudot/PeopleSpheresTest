import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { getMultiSelected, repeat } from "../../../utils";
import {
  isCategoriesValid,
  isNameValid,
  isInputNotNull,
  isValidateDate,
} from "./validators";

import { useSelector } from "react-redux";

export const ProductForm = ({ onSave, product = {} }) => {
  const [name, setName] = useState(product.name || "");
  const [brand, setBrand] = useState(product.brand || "");
  const [rating, setRating] = useState(product.rating || 0);
  const [categories, setCategories] = useState(product.categories || []);
  const [itemsInStock, setItemsInStock] = useState(product.itemsInStock || 0);
  const [receiptDate, setReceiptDate] = useState(product.receiptDate || "");
  const [expirationDate, setExpirationDate] = useState(
    product.expirationDate || ""
  );
  const [featured, setFeatured] = useState(product.featured || false);

  const categoriesStore = useSelector((state) => state.categories);

  const isFormValid = () => {
    return (
      isNameValid(name) &&
      isCategoriesValid(categories) &&
      isInputNotNull(brand) &&
      isValidateDate(expirationDate)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const updatedFeatured = rating >= 8 ? true : featured;
    onSave({
      name,
      brand,
      rating,
      categories,
      itemsInStock,
      receiptDate,
      expirationDate,
      featured: updatedFeatured,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          valid={isNameValid(name)}
          invalid={!isNameValid(name)}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name}
          autoFocus
          onChange={({ target }) => setName(target.value)}
          autoComplete="given-name"
        />
        <FormFeedback>
          Name is required, the length must not be greater than 200
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="brand">Brand</Label>
        <Input
          valid={isInputNotNull(brand)}
          invalid={!isInputNotNull(brand)}
          type="text"
          name="brand"
          id="brand"
          placeholder="Brand"
          value={brand}
          onChange={({ target }) => setBrand(target.value)}
        />
        <FormFeedback>Please fill out a brand Name</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="rating">Rating</Label>
        <Input
          valid
          type="select"
          name="rating"
          id="rating"
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        >
          {repeat(11).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="categories">Categories</Label>
        <Input
          valid={isCategoriesValid(categories)}
          invalid={!isCategoriesValid(categories)}
          type="select"
          name="categories"
          id="categories"
          multiple
          value={categories}
          onChange={({ target }) => setCategories(getMultiSelected(target))}
        >
          {categoriesStore.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Input>
        <FormFeedback>A product must have from 1 to 5 categories</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="itemsInStock">Items In Stock</Label>
        <Input
          valid
          type="number"
          name="itemsInStock"
          id="itemsInStock"
          value={itemsInStock}
          onChange={({ target }) => setItemsInStock(target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="expirationDate">Expiration date</Label>
        <Input
          valid={isValidateDate(expirationDate)}
          invalid={!isValidateDate(expirationDate)}
          type="date"
          name="expirationDate"
          id="expirationDate"
          value={expirationDate}
          onChange={({ target }) => setExpirationDate(target.value)}
        />
        <FormFeedback>
          If a product has an expiration date it must expire not less than 30
          days since now
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="receiptDate">Receipt date</Label>
        <Input
          valid
          type="date"
          name="receiptDate"
          id="receiptDate"
          value={receiptDate}
          onChange={({ target }) => setReceiptDate(target.value)}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            id="checkbox"
            checked={featured}
            onChange={({ target }) => setFeatured(target.checked)}
          />
          Featured
        </Label>
      </FormGroup>
      <Button disabled={!isFormValid()}>Submit</Button>
    </Form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};
