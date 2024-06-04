// Core
import * as React from "react";
import * as ReactDOM from "react-dom/client";
// Third party
import { Provider } from "react-redux";
// Local
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);