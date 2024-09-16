import React from "react";
import ReactDOM from "react-dom/client";
import "./stylesheets/all.scss";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "animate.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.scss";
//slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//react-datepicker
import "react-datepicker/dist/react-datepicker.css";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-final-travel">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
