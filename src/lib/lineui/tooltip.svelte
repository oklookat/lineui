<script lang="ts">
  import { fade } from "svelte/transition";

  let contentActive = false;
  let tContainer: HTMLDivElement;
  let content: HTMLSpanElement;

  let pointerSubscribers = 0;

  function onPointerEnter(e: PointerEvent) {
    pointerSubscribers++;
    show();
  }

  function onPointerOut(e: PointerEvent) {
    pointerSubscribers--;
    if (pointerSubscribers < 1) {
      hide();
      pointerSubscribers = 0;
    }
  }

  function show() {
    contentActive = true;
    setTimeout(() => {
      content.style.width = tContainer.offsetWidth + "px";
      content.style.height = tContainer.offsetHeight + "px";
      content.style.visibility = "visible";

      const rect = tContainer.getBoundingClientRect();
      const yAbs = rect.y + window.scrollY;
      // TOP.
      let contentYPos = yAbs - tContainer.offsetHeight;
      if (contentYPos < 0) {
        // BOTTOM.
        contentYPos = yAbs + tContainer.offsetHeight;
      }

      const xAbs = rect.x + window.scrollX;

      content.style.top = contentYPos + "px";
      content.style.left = xAbs + "px";
    }, 0);
  }

  function hide() {
    contentActive = false;
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key == "Escape") {
      hide();
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role
</script>

<svelte:document on:keydown={onKeyDown} />

<div
  class="tooltip"
  bind:this={tContainer}
  on:focus|capture={show}
  on:blur|capture={hide}
  on:pointerenter={onPointerEnter}
  on:pointerleave={onPointerOut}
>
  <slot />
  {#if contentActive}
    <span
      class="content"
      role="tooltip"
      bind:this={content}
      transition:fade={{ delay: 0, duration: 80 }}
      on:pointerenter={onPointerEnter}
      on:pointerleave={onPointerOut}
    >
      <slot name="content" />
    </span>
  {/if}
</div>

<style>
  .tooltip {
    height: 100%;
    width: 100%;
    & .content {
      border: 0.1rem solid var(--color-border);
      background-color: var(--color-background);
      box-shadow: 0px 0px 4px 0px var(--color-shadow);
      visibility: hidden;
      inset: 0;
      z-index: 1;
      position: absolute;
    }
  }
</style>
