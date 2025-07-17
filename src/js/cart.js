import {loadHeaderFooter} from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

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
  
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  setupRemoveButtons();

  setupQuantityChange();
}

function sumPrices(items) {
  return items.reduce((total, item) => total + (item.FinalPrice * (item.Quantity || 1)), 0);
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
    <label>Qty:
      <input type="number" class="cart-card__quantity-input" min="1" value="${item.Quantity || 1}" data-id="${item.Id}" />
    </label>
    <p class="cart-card__price">$${(item.FinalPrice * (item.Quantity || 1)).toFixed(2)}</p>
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
  renderCartContents();
}


function setupQuantityChange() {
  document.querySelectorAll('.cart-card__quantity-input').forEach(input =>
    input.addEventListener('change', e => {
      const qty = Math.max(1, parseInt(e.target.value, 10));
      e.target.value = qty;
      const id = e.target.dataset.id;
      const cart = (getLocalStorage("so-cart") || []).map(item =>
        item.Id === id ? {...item, Quantity: qty} : item
      );
      localStorage.setItem("so-cart", JSON.stringify(cart));
      renderCartContents();
    })
  );
}

// Inicializar
renderCartContents();