import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const productData = new ProductData('tents');
console.log(productData.getData());

const productList = new ProductList('tents', productData, document.querySelector('.product-list'));
console.log(productList);