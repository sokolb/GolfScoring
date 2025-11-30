import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css";
import "./styles/typography.css";
import "./styles/buttons.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./Store/configureStore";
import Root from "./Root";

const store = configureStore();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Root store={store} />);

reportWebVitals();
