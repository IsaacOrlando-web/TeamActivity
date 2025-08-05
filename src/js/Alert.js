export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    const category = this.getCategoryFromURL();
    this.alerts = await this.getAlerts();

    if (category) {
      const alert = this.alerts.find((a) => a.category === category);
      if (alert) {
        this.renderAlert(alert);
      }
    }
  }

  getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
  }

  async getAlerts() {
    try {
      const response = await fetch("/json/alerts.json");
      if (!response.ok) throw new Error("Failed to fetch alerts.");
      return await response.json();
    } catch (error) {
      console.error("Error loading alerts:", error);
      return [];
    }
  }

  renderAlert(alert) {
    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    const div = document.createElement("div");
    div.classList.add("alert-container");
    div.style.backgroundColor = alert.background;

    const p = document.createElement("p");
    p.textContent = alert.message;
    p.style.color = alert.color;
    p.classList.add("scrolling-text");

    div.appendChild(p);
    alertList.appendChild(div);

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertList);
    }
  }
}
