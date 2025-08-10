import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100,
      )
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/?products=${product.Id}">
      <picture>
        <source media="(min-width: 1281px)" srcset="${product.Images.PrimaryExtraLarge}">
        <source media="(min-width: 769px) and (max-width: 1280px)" srcset="${product.Images.PrimaryLarge}">
        <source media="(max-width: 768px)" srcset="${product.Images.PrimaryLarge}">
        <img 
          loading="lazy" 
          src="${product.Images.PrimaryLarge}" 
          alt="${product.Name}" 
      </picture>
      <div class="product-info-container">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        ${isDiscounted ? `<span class="product-card__discount">-${discountPercent}% OFF</span>` : ""}
      </div>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    console.log(`Loading products for category: ${this.category}`);
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

// ✅ Search form function FIXED IN HERE:
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const query = document.querySelector(".search-input").value.trim();
      if (query) {
        window.location.href = `/product-list.html?query=${encodeURIComponent(query)}`;
      }
    });
  }
});
