// Simple language switcher for Portfolio
import en from "./local/en.json";
import fr from "./local/fr.json";

const translations: Record<string, any> = { en, fr };
const langButtons = document.querySelectorAll(".lang-btn") as NodeListOf<HTMLButtonElement>;
let currentLang: "en" | "fr" = "en";

// Get value from nested object using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

function setLanguage(lang: "en" | "fr") {
  currentLang = lang;
  const t = translations[lang];

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      const value = getNestedValue(t, key);
      if (value) el.textContent = value;
    }
  });

  // Handle contact links specially (need to set innerHTML)
  const contactLinks = document.getElementById("contact-links");
  if (contactLinks) {
    contactLinks.innerHTML = `
      <a href="https://linkedin.com/in/jules-goy" target="_blank">${t.contact.links.linkedin}</a> |
      <a href="https://github.com/witchoy" target="_blank">${t.contact.links.github}</a> |
      <a href="mailto:julesgoydev@gmail.com">${t.contact.links.email}</a> |
      <a href="https://letterboxd.com/jules_goy" target="_blank">${t.contact.links.letterboxd}</a>
    `;
  }

  // Update active button state
  langButtons.forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Listen for button clicks
langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang") as "en" | "fr";
    setLanguage(lang);
  });
});

// Set default language on load
setLanguage(currentLang);
