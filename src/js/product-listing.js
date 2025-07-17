import {loadHeaderFooter, getParam} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

console.log("Inside");
loadHeaderFooter();
console.log(window.location.pathname);

// Initialize the product data source for "tents"


const category = getParam("category");
console.log(category);
const dataSource = new ProductData();
const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();
