import {
  fetchCategories,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from "../categories";
import { categoryApi } from "../../../gateways/CategoryApi";

// Mock the categoryApi to control the return value of getCategories
jest.mock("../../../gateways/CategoryApi", () => {
  const originalModule = jest.requireActual("../../../gateways/CategoryApi");
  // Mock categories data
  const mockCategories = [
    { id: 1, name: "TV & Home Cinema" },
    { id: 2, name: "Laptops" },
  ];

  return {
    ...originalModule,
    categoryApi: {
      ...originalModule.categoryApi,
      getCategories: jest.fn(() => mockCategories),
    },
  };
});

describe("categories Actions", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  describe("fetchCategories", () => {
    it("fetches all categories and dispatches REQUEST_CATEGORIES and RECEIVE_CATEGORIES", () => {
      // Setup
      const mockCategories = [
        { id: 1, name: "TV & Home Cinema" },
        { id: 2, name: "Laptops" },
      ];

      const expectedActions = [
        { type: REQUEST_CATEGORIES },
        { type: RECEIVE_CATEGORIES, categories: mockCategories },
      ];

      // Action
      fetchCategories()(dispatch);

      // Assertion
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, expectedActions[0]);
      expect(dispatch).toHaveBeenNthCalledWith(2, expectedActions[1]);
      // Verify if categoryApi.getCategories was called
      expect(categoryApi.getCategories).toHaveBeenCalled();
    });
  });
});
