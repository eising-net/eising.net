const root = document.documentElement;
const modeSwitch = document.querySelector("#mode-switch");
const storageKey = "eising-mode";
const cards = [...document.querySelectorAll(".panel-card")].map((card) => ({
  card,
  eyebrow: card.querySelector("[data-eyebrow]"),
  description: card.querySelector("[data-description]"),
}));

function applyMode(isDevMode) {
  root.dataset.theme = isDevMode ? "dev" : "default";

  cards.forEach(({ card, eyebrow, description }) => {
    card.href = isDevMode ? card.dataset.devHref : card.dataset.netHref;

    if (eyebrow) {
      eyebrow.textContent = isDevMode
        ? card.dataset.devEyebrow
        : card.dataset.netEyebrow;
    }

    if (description) {
      description.textContent = isDevMode
        ? card.dataset.devDescription
        : card.dataset.netDescription;
    }
  });
}

const storedMode = window.localStorage.getItem(storageKey);
const prefersStoredDevMode = storedMode === "dev";

modeSwitch.checked = prefersStoredDevMode;
applyMode(prefersStoredDevMode);

modeSwitch.addEventListener("change", () => {
  const isDevMode = modeSwitch.checked;

  applyMode(isDevMode);
  window.localStorage.setItem(storageKey, isDevMode ? "dev" : "default");
});
