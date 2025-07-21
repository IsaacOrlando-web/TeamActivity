import {loadHeaderFooter} from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

loadHeaderFooter();

let totalPrice = 0;
const totalCartPrice = document.getElementById("cart-total-price");
const cartFooter = document.querySelector(".cart-footer");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  totalPrice = 0; // Resetear el total
  
  if (!cartItems || cartItems.length === 0) {
    cartFooter.classList.add("hide");
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty</p>";
    return;
  } else {
    cartFooter.classList.remove("hide");
    totalCartPrice.textContent = `$${sumPrices(cartItems)}`;
  }
  
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  setupRemoveButtons();
}

function sumPrices(items) {
  return items.reduce((total, item) => total + item.FinalPrice, 0);
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider" data-id="${item.Id}">
    <a href="/product_pages/?products=${item.Id}" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/?products=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <button class="cart-card__remove" data-id="${item.Id}">X</button>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function setupRemoveButtons() {
  document.querySelector(".product-list").addEventListener("click", function(e) {
    if (e.target.classList.contains("cart-card__remove")) {
      if (confirm("Are you sure you want to remove this item from your cart?")) {
        removeItemFromCart(e.target.dataset.id);
      }
    }
  });
}

function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter(item => item.Id !== productId);
  localStorage.setItem("so-cart", JSON.stringify(updatedCart));
  updateCartCount();
  renderCartContents();
}

// Inicializar
renderCartContents();

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});