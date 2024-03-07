import * as productsActions from "../../actions/products";

import { products, isFeatured } from "../products"; // Adjust the import path as necessary

describe("products reducer", () => {
  it("should return the initial state", () => {
    expect(products(undefined, {})).toEqual([]);
  });

  it("should handle RECEIVE_PRODUCTS", () => {
    const initialState = [];
    const action = {
      type: productsActions.RECEIVE_PRODUCTS,
      products: [{ id: "1", name: "Product 1" }],
    };
    const expectedState = [{ id: "1", name: "Product 1" }];

    expect(products(initialState, action)).toEqual(expectedState);
  });

  it("should handle DELETE_PRODUCT", () => {
    const initialState = [
      { id: "1", name: "Product 1" },
      { id: "2", name: "Product 2" },
    ];
    const action = {
      type: productsActions.DELETE_PRODUCT,
      productId: "1",
    };
    const expectedState = [{ id: "2", name: "Product 2" }];

    expect(products(initialState, action)).toEqual(expectedState);
  });

  it("should handle UPDATE_PRODUCT", () => {
    const initialState = [
      { id: "1", name: "Product 1", rating: 5, featured: false },
    ];
    const action = {
      type: productsActions.UPDATE_PRODUCT,
      productId: "1",
      data: { name: "Updated Product 1", rating: 9 },
    };
    const expectedState = [
      {
        id: "1",
        name: "Updated Product 1",
        rating: 9,
        featured: isFeatured({ rating: 9 }),
      },
    ];

    expect(products(initialState, action)).toEqual(expectedState);
  });

  it("should handle CREATE_PRODUCT", () => {
    const initialState = [];
    const action = {
      type: productsActions.CREATE_PRODUCT,
      data: { name: "New Product", rating: 10 },
    };
    const newState = products(initialState, action);
    const newProduct = newState.find(
      (product) => product.name === "New Product"
    );

    expect(newProduct).toBeDefined();
    expect(newProduct.featured).toBe(isFeatured({ rating: 10 }));
    expect(newProduct.id).toBeDefined(); // Assuming generateId() works correctly
    expect(newProduct.createdAt).toBeDefined();
  });
});
