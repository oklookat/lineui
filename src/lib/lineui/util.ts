/** https://github.com/sveltejs/svelte/issues/1133#issuecomment-654976622 */
export function portal(element: HTMLElement, target: HTMLElement | string) {
  const targetElement =
    typeof target == "string" ? document.querySelector(target) : target;

  if (targetElement == null)
    throw new Error("portal: target element not found/undefined.");

  targetElement.append(element);

  return {
    destroy() {
      element.remove();
    },
  };
}

export function pixelsToRem(pixels: number) {
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return pixels / baseFontSize;
}

export function remToPixels(rem: number) {
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return rem * baseFontSize;
}