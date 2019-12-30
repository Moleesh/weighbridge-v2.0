import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import App from "./components/app";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

import "./css/index.css";

// const error = console.error;
// console.error = event => {
//   if (!event.includes("localhost:8080|CORS policy")) error(event);
// };


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={LoginForm} />
            <Route path="/404" component={NotFound} />
        </Switch>
    </BrowserRouter>, document.getElementById("root"));


