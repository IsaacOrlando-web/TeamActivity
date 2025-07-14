import { getLocalStorage } from "./utils.mjs";

let totalPrice = 0; //Global variable to hold total price
const totalCartPrice = document.getElementById("cart-total-price"); // Get the element to display total price
const cartFooter = document.querySelector(".cart-footer"); // Get the footer element, to hide it if cart is empty

function renderCartContents() {
  //console.log("Cart items:", getLocalStorage("so-cart"));
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide"); // Hide footer if cart is empty
  } else {
    totalCartPrice.textContent = `$${sumPrices(cartItems)}`; // Display total price in the footer
  }
  const htmlItems = cartItems ? cartItems.map((item) => cartItemTemplate(item)) : [];
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Function to calculate total price of items in the cart
function sumPrices(items) {
  items.forEach((item) => {
    // Iterate through each item to calculate total price
    totalPrice += item.FinalPrice; // Add item's price to totalPrice
  });

  return totalPrice; // Return the total price
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/${item.Id}.html" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/${item.Id}.html">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
