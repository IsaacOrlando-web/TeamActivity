import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

const displayCategory = document.getElementById("products-category");

loadHeaderFooter();

const category = getParam("category");
displayCategory.textContent = category;

const dataSource = new ExternalServices();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
