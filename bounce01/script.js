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

// ---------- Bounce 01: profile photo switcher ----------
// Click -> callback -> fade out -> change src and alt -> fade in (no page reload)
const avatar = document.getElementById("avatar");
const btnCasual = document.getElementById("btn-casual");
const btnProfessional = document.getElementById("btn-professional");

const photos = {
  casual: {
    src: "assets/casual.svg",
    alt: "Casual portrait of Rand Maghierh"
  },
  professional: {
    src: "assets/professional.svg",
    alt: "Professional portrait of Rand Maghierh"
  }
};

function switchPhoto(mode) {
  const photo = photos[mode];

  // Do nothing if this photo is already displayed
  if (avatar.getAttribute("src") === photo.src) return;

  // 1. Fade the current photo out (CSS transition)
  avatar.classList.add("fade-out");

  // 2. When the fade-out ends, swap src and alt, then fade back in
  avatar.addEventListener("transitionend", function change() {
    avatar.src = photo.src;
    avatar.alt = photo.alt;
    avatar.classList.remove("fade-out");
    avatar.removeEventListener("transitionend", change);
  });

  btnCasual.classList.toggle("active", mode === "casual");
  btnProfessional.classList.toggle("active", mode === "professional");
}

btnCasual.addEventListener("click", function () {
  switchPhoto("casual");
});

btnProfessional.addEventListener("click", function () {
  switchPhoto("professional");
});
