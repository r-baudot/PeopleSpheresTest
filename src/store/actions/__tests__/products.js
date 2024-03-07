import {
  CREATE_PRODUCT,
  createProductForm,
  UPDATE_PRODUCT,
  updateProductForm,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../products";
import { isFeatured, products } from "../../reducers/products";
import { useNavigate } from "react-router-dom";

// Mocking the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // if you have other exports you want to keep
  useNavigate: jest.fn(),
}));

describe("products Actions", () => {
  let dispatch;
  let navigate;

  beforeEach(() => {
    dispatch = jest.fn();
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate); // Mock the return value of useNavigate
  });

  it("delete product", () => {
    const removed = { id: "1" };
    const result = products([removed, { id: "2" }], deleteProduct(removed.id));
    expect(result).not.toContain(removed);
  });

  it("update product", () => {
    const data = { rating: 3 };
    const result = products([{ id: "2", rating: 1 }], updateProduct("2", data));
    expect(result[0].rating).toBe(3);
  });

  it("create product", () => {
    const data = { rating: 3 };
    const result = products([], createProduct(data));
    expect(result.length).toBe(1);
  });

  describe("isFeatured", () => {
    it("is false if it is not featured", () => {
      expect(isFeatured({ rating: 1, featured: false })).toBe(false);
    });

    it("is true if rating is more than 8", () => {
      expect(isFeatured({ rating: 9 })).toBe(true);
    });

    it("is true if it is featured", () => {
      expect(isFeatured({ rating: 1, featured: true })).toBe(true);
    });
  });

  describe("updateProductForm", () => {
    it("update a product", () => {
      const data = { name: "iphone" };
      updateProductForm(data, "1", navigate)(dispatch); // Assuming updateProductForm is adapted to accept navigate

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_PRODUCT);
      expect(dispatch.mock.calls[0][0].data).toBe(data);
    });

    it("redirects to home page", () => {
      updateProductForm("1", {}, navigate)(dispatch); // Adapted call

      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  describe("createProductForm", () => {
    it("create a product", () => {
      const data = { name: "iphone" };
      createProductForm(data, navigate)(dispatch); // Assuming createProductForm is adapted to accept navigate

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch.mock.calls[0][0].type).toBe(CREATE_PRODUCT);
      expect(dispatch.mock.calls[0][0].data).toMatchObject(data);
    });

    it("redirects to home page", () => {
      createProductForm({}, navigate)(dispatch); // Adapted call
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
