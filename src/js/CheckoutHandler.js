import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();

window.addEventListener("DOMContentLoaded", () => {
  const subtotal = checkout.calculateSubtotal();
  checkout.calculateTaxAndShipping(subtotal);

  document.querySelector('input[name="zip"]').addEventListener("input", () => {
    const currentSubtotal = checkout.calculateSubtotal();
    checkout.calculateTaxAndShipping(currentSubtotal);
  });

  document.getElementById("close-confirmation").addEventListener("click", () => {
    document.getElementById("order-confirmation").classList.add("hide");
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 500);
  });
});

document.getElementById("checkoutForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const result = await checkout.checkout(event.target);

  const formData = new FormData(event.target);
  const fullName = `${formData.get("fname")} ${formData.get("lname")}`;
  document.getElementById("customer-name").textContent = fullName;

  document.getElementById("order-confirmation").classList.remove("hide");

  localStorage.removeItem("so-cart");
});
