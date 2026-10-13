# Exercise 00: Personal Portfolio

A responsive personal portfolio built from scratch with HTML5, CSS3 and JavaScript ES6+.
No framework, no template, no UI library.

## Files
- `index.html`: page structure (navbar, About Me, Skills, Projects 00-03, Hobbies, Contact form, Footer)
- `style.css`: styling with Flexbox, CSS variables for themes, and media queries
- `script.js`: theme switcher and contact form validation
- `assets/`: image  `profile.jpeg`

## Run
Open `index.html` in a browser.

## Mandatory JavaScript feature: theme switcher
The button in the navbar switches between a light and a dark theme.

### Event lifecycle
1. **User action**: the user clicks the "Dark mode" button.
2. **Event firing**: the browser creates a `click` event on `#theme-toggle`.
3. **JavaScript callback**: the function `toggleTheme()`, registered with `addEventListener("click", ...)`, runs and reads the current theme.
4. **DOM/CSS mutation**: the function sets `data-theme` on the `<html>` element. The CSS rule `:root[data-theme="dark"]` then overrides the colour variables, so the whole page changes colour. The button text is updated too, and the choice is saved in `localStorage`.

## Responsive design
- Flexbox for the navbar, About section, skills, projects and hobbies.
- Media queries at 768px and 600px: the About section stacks vertically and the navbar wraps.

## Git
```
git init
git add .
git commit -m "ex00: personal portfolio"
```
