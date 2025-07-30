export default class CheckoutProcess {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  }

  calculateSubtotal() {
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    return subtotal;
  }

  calculateTaxAndShipping(subtotal) {
    const tax = subtotal * 0.06;
    const shipping = this.cartItems.length >= 1 ? 10 + 2 * (this.cartItems.length - 1) : 0;
    const orderTotal = subtotal + tax + shipping;

    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("total").textContent = orderTotal.toFixed(2);

    return { tax, shipping, orderTotal };
  }

  packageItems() {
    return this.cartItems.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity || 1
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries());
    const { tax, shipping, orderTotal } = this.calculateTaxAndShipping(this.calculateSubtotal());
    order.orderDate = new Date().toISOString();
    order.tax = tax.toFixed(2);
    order.shipping = shipping;
    order.orderTotal = orderTotal.toFixed(2);
    order.items = this.packageItems();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    };

    const url = "https://wdd330-backend.onrender.com/checkout";
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log("Server ansewer", result);

  }
}