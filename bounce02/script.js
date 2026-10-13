// ---------- Translation dictionary ----------
const translations = {
  en: {
    name: "Rand Maghierh",
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navHobbies: "Hobbies",
    navContact: "Contact",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    photoAlt: "Portrait of Rand Maghierh",
    heroTitle: "Hi, I'm Rand Maghierh.",
    aboutP1: "I'm a student developer who builds websites from scratch with HTML, CSS and JavaScript. I enjoy turning a blank page into something people can actually use.",
    aboutP2: "This portfolio shows what I learned in the previous projects, with no framework and no template.",
    skillsTitle: "Skills",
    skillResponsive: "Responsive design",
    projectsTitle: "Projects",
    p0Title: "Project 00: Linux, Git & GitHub",
    p0Text: "Terminal navigation, a shell script for file manipulation, and a public GitHub repository with a README and SSH key authentication.",
    p1Title: "Project 01: HTML Fundamentals",
    p1Text: "Six pages covering document structure, text hierarchy, links and images, lists and tables, an accessible registration form, and a semantic blog layout.",
    p2Title: "Project 02: CSS & Visual Presentation",
    p2Text: "Flexbox layouts, fixed and absolute positioning, shapes drawn with pure CSS, color models, the box model, and animations with hover transitions.",
    p3Title: "Project 03: JavaScript & Interactivity",
    p3Text: "Variables and types, functions and conditions, DOM manipulation, a click-driven counter, and an interactive task manager.",
    viewProject: "View project",
    hobbiesTitle: "Hobbies",
    hobby1: "Coding side projects",
    hobby2: "Reading",
    hobby3: "Robotics & IoT",
    hobby4: "Photography",
    contactTitle: "Contact",
    labelName: "Name",
    labelEmail: "Email",
    labelMessage: "Message",
    send: "Send message",
    footerText: "© 2026 Rand Maghierh. Built with HTML, CSS and JavaScript.",
    errorFields: "Please fill in every field with a valid email.",
    thanks: "Thanks {name}, your message is ready to send.",
    langButton: "العربية"
  },
  ar: {
    name: "راند مغيرة",
    navAbout: "نبذة عني",
    navSkills: "المهارات",
    navProjects: "المشاريع",
    navHobbies: "الهوايات",
    navContact: "تواصل معي",
    themeDark: "الوضع الداكن",
    themeLight: "الوضع الفاتح",
    photoAlt: "صورة شخصية لراند مغيرة",
    heroTitle: "مرحباً، أنا راند مغيرة.",
    aboutP1: "أنا طالبة مطوّرة أبني المواقع من الصفر باستخدام HTML وCSS وJavaScript. أحب تحويل الصفحة الفارغة إلى شيء يستخدمه الناس فعلاً.",
    aboutP2: "يعرض هذا الموقع ما تعلمته في المشاريع السابقة، دون أي إطار عمل أو قالب جاهز.",
    skillsTitle: "المهارات",
    skillResponsive: "تصميم متجاوب",
    projectsTitle: "المشاريع",
    p0Title: "المشروع 00: Linux وGit وGitHub",
    p0Text: "التنقل في الطرفية، وسكربت شل لإدارة الملفات، ومستودع GitHub عام مع ملف README ومصادقة بمفتاح SSH.",
    p1Title: "المشروع 01: أساسيات HTML",
    p1Text: "ست صفحات تغطي بنية المستند، وتسلسل النصوص، والروابط والصور، والقوائم والجداول، ونموذج تسجيل سهل الوصول، وتخطيط مدونة دلالي.",
    p2Title: "المشروع 02: CSS والعرض البصري",
    p2Text: "تخطيطات Flexbox، والتموضع الثابت والمطلق، وأشكال مرسومة بـ CSS فقط، ونماذج الألوان، ونموذج الصندوق، وحركات وانتقالات عند التمرير.",
    p3Title: "المشروع 03: JavaScript والتفاعلية",
    p3Text: "المتغيرات والأنواع، والدوال والشروط، والتعامل مع DOM، وعداد يتفاعل مع النقر، ومدير مهام تفاعلي.",
    viewProject: "عرض المشروع",
    hobbiesTitle: "الهوايات",
    hobby1: "برمجة مشاريع جانبية",
    hobby2: "القراءة",
    hobby3: "الروبوتات وإنترنت الأشياء",
    hobby4: "التصوير",
    contactTitle: "تواصل معي",
    labelName: "الاسم",
    labelEmail: "البريد الإلكتروني",
    labelMessage: "الرسالة",
    send: "إرسال الرسالة",
    footerText: "© 2026 راند مغيرة. بُني باستخدام HTML وCSS وJavaScript.",
    errorFields: "يرجى تعبئة جميع الحقول وإدخال بريد إلكتروني صحيح.",
    thanks: "شكراً {name}، رسالتك جاهزة للإرسال.",
    langButton: "English"
  }
};

const root = document.documentElement;
const langButton = document.getElementById("lang-toggle");
const themeButton = document.getElementById("theme-toggle");
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

let currentLang = "en";

// ---------- Language switcher ----------
// Click -> callback -> change <html lang dir> and rewrite every translated text
function setLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];

  // Direction and language of the whole document
  root.setAttribute("lang", lang);
  root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Every element with data-i18n gets its text from the dictionary
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = dict[element.dataset.i18n];
  });

  // Alt text of images
  document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
    element.alt = dict[element.dataset.i18nAlt];
  });

  langButton.textContent = dict.langButton;
  updateThemeButton();
  status.textContent = "";

  try {
    localStorage.setItem("lang", lang);
  } catch (e) {}
}

langButton.addEventListener("click", function () {
  setLanguage(currentLang === "en" ? "ar" : "en");
});

// ---------- Theme switcher ----------
function updateThemeButton() {
  const isDark = root.getAttribute("data-theme") === "dark";
  themeButton.textContent = translations[currentLang][isDark ? "themeLight" : "themeDark"];
}

themeButton.addEventListener("click", function () {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  updateThemeButton();
  try {
    localStorage.setItem("theme", isDark ? "light" : "dark");
  } catch (e) {}
});

// ---------- Contact form validation ----------
form.addEventListener("submit", function (event) {
  event.preventDefault();

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

  const dict = translations[currentLang];
  if (!valid) {
    status.textContent = dict.errorFields;
    return;
  }

  status.textContent = dict.thanks.replace("{name}", form.name.value.trim());
  form.reset();
});

// ---------- Restore saved choices on page load ----------
let savedLang = null;
let savedTheme = null;
try {
  savedLang = localStorage.getItem("lang");
  savedTheme = localStorage.getItem("theme");
} catch (e) {}

if (savedTheme === "dark" || savedTheme === "light") {
  root.setAttribute("data-theme", savedTheme);
}
setLanguage(savedLang === "ar" ? "ar" : "en");
