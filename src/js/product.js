import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

loadHeaderFooter();

export default class ProductDetails {
  constructor(productIdP, dataSourceP) { //'productId' is already declared in the upper scope on line 87 column 7. a "P" for parameter
    this.productIdP = productIdP;
    this.product = {};
    this.dataSource = dataSourceP;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const found = cartItems.find((element) => element.Id === this.product.Id);
    if (found) {
      found.Quantity = (found.Quantity || 0) + 1; // Si existe, incrementa Quantity (o la inicializa en 1 si no existe)
      //console.log("Cantidad actualizada:", found.Quantity);
      found.FinalPrice = found.FinalPrice * found.Quantity;
    } else {
      this.product.Quantity = 1; // Añade Quantity = 1 al producto nuevo
      cartItems.push(this.product);
      //console.log("Producto añadido por primera vez");
    }
    
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(productP) { //'product' is already declared in the upper scope on line 89 column 7 Using "P" for Parameter
  document.querySelector("h2").textContent = productP.Brand.Name;
  document.querySelector("h3").textContent = productP.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = productP.Images.PrimaryLarge;
  productImage.alt = productP.NameWithoutBrand;

  // Discount calculation
  const isDiscounted = productP.FinalPrice < productP.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(
        ((productP.SuggestedRetailPrice - productP.FinalPrice) / productP.SuggestedRetailPrice) * 100
      )
    : 0;

  const productPriceElement = document.getElementById("productPrice");

  if (isDiscounted) {
    productPriceElement.innerHTML = `
      <span class="original-price">Original price: $${productP.SuggestedRetailPrice.toFixed(2)}</span><br>
      <strong>$${productP.FinalPrice.toFixed(2)}</strong>
      <span class="product-card__discount">-${discountPercent}% OFF</span>
    `;
  } else {
    productPriceElement.textContent = `$${productP.FinalPrice.toFixed(2)}`;
  }

  document.getElementById("productColor").textContent =
    productP.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    productP.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = productP.Id;
}

const productId = getParam("products");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }
