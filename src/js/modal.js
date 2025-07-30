document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("registerModal");
  const closeBtn = modal?.querySelector(".close");
  const registerBtn = modal?.querySelector("button");

  const isRegistered = sessionStorage.getItem("modalRegistered");

  if (!isRegistered) {
    setTimeout(() => {
      modal?.classList.remove("hide");
    }, 1000);
  }

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hide");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hide")) {
      modal.classList.add("hide");
    }
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hide");
    }
  });

  registerBtn?.addEventListener("click", () => {
    sessionStorage.setItem("modalRegistered", "true");
  });
});
