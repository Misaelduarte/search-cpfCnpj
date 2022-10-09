import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProcessProvider } from "./hooks/useProcess";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProcessProvider>
      <App />
    </ProcessProvider>
  </React.StrictMode>
);
