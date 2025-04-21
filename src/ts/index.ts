type MenuAnimations = null | "fade";
interface MenuOptions {
  animation: MenuAnimations;
}
type PassedMenuOptions = {
  [Key in keyof MenuOptions]?: MenuOptions[Key];
};

class SimpleMenu extends EventTarget {
  #isActive = false;
  menu?: HTMLElement;
  currentAnimation: MenuAnimations = null;
  #params: MenuOptions = {
    animation: "fade",
  };

  constructor(menu: HTMLElement, options?: PassedMenuOptions) {
    super();
    if (!menu || !(menu instanceof Element)) {
      console.error("You must provide valid html element");
      throw new Error("You must provide a valid HTML element");
    }
    this.menu = menu;
    this.#params = {
      ...this.#params,
      ...options,
    };
    this.currentAnimation = this.#params.animation;
    this.#_init();
  }
  set menuIsActive(value: boolean) {
    this.#isActive = value;
  }
  get menuIsActive() {
    return this.#isActive;
  }
  open() {
    this.dispatchEvent(new CustomEvent("beforeOpen"));
    if (this.menu) {
      this.menu.style.display = "block";
      this.menu.classList.add("simple-menu-animation-fade-in");
      this.menu.addEventListener(
        "animationend",
        () => {
          this.menuIsActive = true;
          this.dispatchEvent(new CustomEvent("afterOpen"));
        },
        { once: true },
      );
    }
  }
  close() {
    this.dispatchEvent(new CustomEvent("beforeClose"));
    if (this.menu) {
      this.menu.classList.remove("simple-menu-animation-fade-in");
      this.menu.classList.add("simple-menu-animation-fade-out");
      this.menu.addEventListener(
        "animationend",
        () => {
          if (this.menu) {
            this.menu.style.display = "none";
            this.menu.classList.remove("simple-menu-animation-fade-out");
            this.menuIsActive = false;
            this.dispatchEvent(new CustomEvent("afterClose"));
          }
        },
        { once: true },
      );
    }
  }
  toggle() {
    if (this.menuIsActive == true) {
      this.close();
    } else if (this.menuIsActive == false) {
      this.open();
    }
  }
  #_init() {}
}

export { SimpleMenu };
