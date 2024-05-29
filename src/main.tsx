// Core
import * as React from "react";
import * as ReactDOM from "react-dom/client";
// Third party
import { Provider } from "react-redux";
// Local
import { store } from "@/app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);