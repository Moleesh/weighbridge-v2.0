import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";
import "react-bootstrap-typeahead/css/Typeahead.min.css";
import "react-datetime/css/react-datetime.css";

import "./css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);