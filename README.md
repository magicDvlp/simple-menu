# Simple Menu

A minimal JavaScript menu component written in TypeScript, with optional fade animation and customizable styles via CSS or Sass.

## 📦 Installation

```bash
npm install magic-simple-menu
```

### JavaScript

You can use either the ES module (recommended) or the UMD version.

```html
<!-- ES Module (recommended) -->
<script type="module" src="public/js/index.es.js"></script>

<!-- UMD (for older setups) -->
<script src="public/js/index.js"></script>
```

### Styles

You can use the provided CSS files:

```html
<!-- Unminified -->
<link rel="stylesheet" href="public/css/style.css" />

<!-- Minified -->
<link rel="stylesheet" href="public/css/style.min.css" />
```

Or import Sass into your project if you're using a bundler:

```scss
@import "public/sass/style.sass";
```

## 📄 HTML Structure

```html
<div class="simple-menu">
  <ul class="simple-menu-list">
    <li class="simple-menu-item">
      <a href="{{url}}" class="simple-menu-item__link">item1</a>
    </li>
    <li class="simple-menu-item">
      <a href="{{url}}" class="simple-menu-item__link">item2</a>
    </li>
  </ul>
</div>
```

## 🔧 Usage

### Create a menu instance

```js
import { SimpleMenu } from "./public/js/index.es.js";

const menuElement = document.querySelector(".simple-menu");
const menu = new SimpleMenu(menuElement, {
  animation: "fade", // or null
});
```

### Available Options

| Option    | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| animation | string | 'fade'  | Fade animation or `null` |

### Public Methods

#### `menu.open()`

Opens the menu with animation (if enabled).

#### `menu.close()`

Closes the menu with animation (if enabled).

#### `menu.toggle()`

Toggles menu open/close state.

### Events

The `SimpleMenu` instance extends `EventTarget`, so you can listen to lifecycle events:

```js
menu.addEventListener("beforeOpen", () => {
  console.log("Menu will open");
});

menu.addEventListener("afterOpen", () => {
  console.log("Menu opened");
});

menu.addEventListener("beforeClose", () => {
  console.log("Menu will close");
});

menu.addEventListener("afterClose", () => {
  console.log("Menu closed");
});
```

## 🌟 Styling

### Default CSS Variables

```sass
.simple-menu
  --sm-bg-color: rgba(29, 17, 40, 0.95)
  --sm-text-color: #fff
  --sm-padding: 2rem
  --sm-font-size: 3rem
  --sm-font-weight: 500
  --sm-item-mb: 2rem
```

You can override these variables to customize the look of the menu.
