export const toggleActive = (ev?: MouseEvent, el?: HTMLElement) => {
  if (el) {
    const { children } = el.parentNode as HTMLElement;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("active");
    }
    el.classList.add("active");
  }
  if (ev) {
    const e = ev.currentTarget as HTMLElement;
    const { children } = e.parentNode as ParentNode;
    let index = 0;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("active");
      children[i] === e && (index = i);
    }
    e.classList.add("active");
    return index;
  }
};
