(() => {
    // Keep the homepage hidden until authentication is implemented.
  document.body.classList.add("auth-locked");

  const loginForm = document.querySelector("#login-form");
  const loginMessage = document.querySelector("#login-message");

  loginForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (loginMessage) {
      loginMessage.textContent =
        "Account authentication hasn't been connected to the backend yet.";
    }
  });
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  const scrim = document.querySelector(".scrim");
  const addSheet = document.querySelector("#add-sheet");
  const searchPanel = document.querySelector("#search-panel");
  const searchInput = searchPanel?.querySelector("input");

  function closeLayers() {
    if (scrim) scrim.hidden = true;
    if (addSheet) addSheet.hidden = true;
    if (searchPanel) searchPanel.hidden = true;
  }

  function openAdd() {
    closeLayers();
    if (scrim) scrim.hidden = false;
    if (addSheet) addSheet.hidden = false;
  }

  function openSearch() {
    closeLayers();
    if (scrim) scrim.hidden = false;
    if (searchPanel) searchPanel.hidden = false;
    setTimeout(() => searchInput?.focus(), 50);
  }

  document.querySelectorAll("[data-open-add]").forEach(button => {
    button.addEventListener("click", openAdd);
  });
  document.querySelectorAll("[data-open-search]").forEach(button => {
    button.addEventListener("click", openSearch);
  });
  document.querySelectorAll("[data-close-sheet], [data-close-search]").forEach(button => {
    button.addEventListener("click", closeLayers);
  });

  document.querySelectorAll("[data-not-ready]").forEach(button => {
    button.addEventListener("click", () => {
      showToast(`${button.dataset.notReady} will be available when your archive is connected.`);
    });
  });

  document.querySelectorAll("[data-nav]").forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.dataset.nav;

      document.querySelectorAll(".nav-item, .desktop-nav-item").forEach(item => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });

      if (button.classList.contains("nav-item") || button.classList.contains("desktop-nav-item")) {
        button.classList.add("active");
        button.setAttribute("aria-current", "page");
      }

      if (destination !== "Home" && destination !== "Discovery") {
        showToast(`${destination} is coming soon.`);
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLayers();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });

  searchPanel?.addEventListener("click", event => event.stopPropagation());
  searchInput?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      showToast("Search will be connected when media storage is ready.");
    }
  });
})();
