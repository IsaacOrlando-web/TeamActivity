export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    this.alerts = await this.getAlerts();
    if (this.alerts.length > 0) {
      this.renderAlerts();
    }
  }

  async getAlerts() {
    try {
      const response = await fetch("/json/alerts.json");
      if (!response.ok) {
        throw new Error("Failed to fetch alerts.");
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading alerts:", error);
      return [];
    }
  }

  renderAlerts() {
    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    this.alerts.forEach((alert) => {
      const div = document.createElement("div");
      div.classList.add("alert-container");
      div.style.backgroundColor = alert.background; // Static background

      const p = document.createElement("p");
      p.textContent = alert.message;
      p.style.color = alert.color;
      p.classList.add("scrolling-text");

      div.appendChild(p);
      alertList.appendChild(div);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertList);
    }
  }
}
