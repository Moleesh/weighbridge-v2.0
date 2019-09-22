import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";
import "./css/index.css";

// const error = console.error;
// console.error = event => {
//   if (!event.includes("localhost:8080|CORS policy")) error(event);
// };

ReactDOM.render(< App/>, document.getElementById("root"));


