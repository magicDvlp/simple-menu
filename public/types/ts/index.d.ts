type MenuAnimations = null | "fade";
interface MenuOptions {
    animation: MenuAnimations;
}
type PassedMenuOptions = {
    [Key in keyof MenuOptions]?: MenuOptions[Key];
};
declare class SimpleMenu extends EventTarget {
    #private;
    menu?: HTMLElement;
    currentAnimation: MenuAnimations;
    constructor(menu: HTMLElement, options?: PassedMenuOptions);
    set menuIsActive(value: boolean);
    get menuIsActive(): boolean;
    open(): void;
    close(): void;
    toggle(): void;
}
export { SimpleMenu };
