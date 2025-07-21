
import {getParam, loadHeaderFooter} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const displayCategory = document.getElementById("products-category");

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

displayCategory.textContent = category;

const dataSource = new ProductData();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

