// directives/autoHeight.ts
import { DirectiveBinding } from "vue";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const resizeObserver = new ResizeObserver(() => {
      setHeight(el, binding);
    });

    resizeObserver.observe(document.body);

    setHeight(el, binding);

    // 清理函数
    el.addEventListener("hook:beforeUnmount", () => {
      resizeObserver.unobserve(document.body);
    });
  },
};

function setHeight(el: HTMLElement, binding: DirectiveBinding) {
  const offset = binding.value || 0; // 允许传递一个偏移量
  const windowHeight = window.innerHeight;
  const rect = el.getBoundingClientRect();
  const topOffset = rect.top;

  el.style.height = `${windowHeight - topOffset - offset}px`;
}
