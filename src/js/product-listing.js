import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const categoryParam = getParam("category");
const dataSource = new ProductData(); 
const listElement = document.querySelector(".product-list");
const myList = new ProductList(categoryParam, dataSource, listElement);

myList.init();

// Change the title dinamically based on the category parameter
const formattedTitle = categoryParam ? categoryParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Products';
document.querySelector('#category-title').innerHTML = `Top Products: ${formattedTitle}`;
