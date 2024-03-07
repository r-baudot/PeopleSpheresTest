import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main";
import ProductsContainer from "./components/Products/ProductsContainer";
import NotFound from "./components/NotFound/NotFound";
import UpdateFormContainer from "./components/Products/Update/UpdateFormContainer";
import AddFormContainer from "./components/Products/Add/AddFormContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ProductsContainer />,
      },
      {
        path: "edit/:productId",
        element: <UpdateFormContainer />,
      },
      {
        path: "add",
        element: <AddFormContainer />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
