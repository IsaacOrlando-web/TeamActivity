import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
