// ---------- Theme switcher ----------
// Event lifecycle:
// 1. User action     -> the user clicks the button
// 2. Event firing    -> the browser fires a "click" event on #theme-toggle
// 3. JS callback     -> toggleTheme() runs (registered with addEventListener)
// 4. DOM/CSS mutation-> data-theme changes on <html>, so the CSS variables change
const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeButton.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // storage not available: the theme still works for this visit
  }
}

function toggleTheme() {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

themeButton.addEventListener("click", toggleTheme);

// Restore the saved theme when the page loads
let saved = null;
try {
  saved = localStorage.getItem("theme");
} catch (e) {}
if (saved === "dark" || saved === "light") {
  applyTheme(saved);
}

// ---------- Contact form validation ----------
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const fields = [form.name, form.email, form.message];
  let valid = true;

  fields.forEach(function (field) {
    const empty = field.value.trim() === "";
    field.classList.toggle("invalid", empty);
    if (empty) valid = false;
  });

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value);
  if (!emailOk) {
    form.email.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    status.textContent = "Please fill in every field with a valid email.";
    return;
  }

  status.textContent = "Thanks " + form.name.value.trim() + ", your message is ready to send.";
  form.reset();
});
