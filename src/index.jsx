import React, { StrictMode } from "react";

import { createRoot } from "react-dom/client"; // Utilisation de createRoot au lieu de ReactDOM
import { Provider } from "react-redux";
import { storeInit, populateStore } from "./store/storeInit";

import { App } from "./App";
import "./index.css"; // import "bootstrap/dist/css/bootstrap.min.css";

populateStore();

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={storeInit}>
      <App />
    </Provider>
  </StrictMode>
);
