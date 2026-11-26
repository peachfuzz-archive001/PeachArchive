(() => {
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  const scrim = document.querySelector(".scrim");
  const addSheet = document.querySelector("#add-sheet");
  const searchPanel = document.querySelector("#search-panel");
  const searchInput = searchPanel.querySelector("input");

  function closeLayers() {
    scrim.hidden = true;
    addSheet.hidden = true;
    searchPanel.hidden = true;
  }
  function openAdd() {
    closeLayers();
    scrim.hidden = false;
    addSheet.hidden = false;
  }
  function openSearch() {
    closeLayers();
    scrim.hidden = false;
    searchPanel.hidden = false;
    setTimeout(() => searchInput.focus(), 50);
  }

  document.querySelectorAll("[data-open-add]").forEach(button => button.addEventListener("click", openAdd));
  document.querySelectorAll("[data-open-search]").forEach(button => button.addEventListener("click", openSearch));
  document.querySelectorAll("[data-close-sheet]").forEach(button => button.addEventListener("click", closeLayers));
  document.querySelectorAll("[data-close-search]").forEach(button => button.addEventListener("click", closeLayers));

  document.querySelectorAll("[data-not-ready]").forEach(button => {
    button.addEventListener("click", () => showToast(`${button.dataset.notReady} browsing is coming soon.`));
  });

  document.querySelectorAll("[data-nav]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
      const destination = button.dataset.nav;
      if (destination !== "Home") showToast(`${destination} is coming soon.`);
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLayers();
  });
  searchPanel.addEventListener("click", event => event.stopPropagation());
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") showToast("Search will be connected when media storage is ready.");
  });
})();
