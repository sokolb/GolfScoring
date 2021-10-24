import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./Store/configureStore";
import Root from "./Root";

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

reportWebVitals();
