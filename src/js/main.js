import Alert from "./Alert.js";
import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  const alert = new Alert();
  alert.init();
});
