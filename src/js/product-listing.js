import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";
import Alert from "./Alert.js";

const displayCategory = document.getElementById("products-category");

loadHeaderFooter();

const category = getParam("category");
displayCategory.textContent = category;

const dataSource = new ProductData();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  const alert = new Alert();
  alert.init();
});
