import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
      )
    : 0;

  return `
    <li class="product-card">
      <a href="/product_pages/?products=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
        ${isDiscounted ? `<span class="product-card__discount">-${discountPercent}% OFF</span>`: ""}
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
