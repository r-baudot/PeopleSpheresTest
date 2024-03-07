import { categories, getCategoriesById } from "../../reducers/categories";
import * as categoriesActions from "../../actions/categories";

describe("categories reducer", () => {
  it("should return the initial state", () => {
    expect(categories(undefined, {})).toEqual([]);
  });

  it("should handle RECEIVE_CATEGORIES", () => {
    const mockCategories = [
      { id: "1", name: "TV" },
      { id: "2", name: "Books" },
    ];

    const action = {
      type: categoriesActions.RECEIVE_CATEGORIES,
      categories: mockCategories,
    };

    expect(categories([], action)).toEqual(mockCategories);
  });
});

describe("getCategoriesById selector", () => {
  it("should transform categories array into an object indexed by IDs", () => {
    const mockState = {
      categories: [
        { id: "1", name: "TV" },
        { id: "2", name: "Books" },
      ],
    };

    const expectedOutput = {
      1: { id: "1", name: "TV" },
      2: { id: "2", name: "Books" },
    };

    expect(getCategoriesById(mockState)).toEqual(expectedOutput);
  });
});
