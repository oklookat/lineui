<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
	import { portal } from "./util.js";

  const dispatch = createEventDispatcher<{ close: null }>();
  let modal: HTMLDivElement;

  onMount(() => {
    modal.scrollTop = 0;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("aria-hidden", "true");
  });

  onDestroy(() => {
    document.body.style.overflow = "";
    document.body.removeAttribute("aria-hidden");
  });

  function checkEsc(e: KeyboardEvent) {
    if (e.key === "Escape") {
      dispatch("close");
    }
  }

  function checkKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      dispatch("close");
    }
  }

  function checkClick(e: MouseEvent) {
    dispatch("close");
  }

  // Prevent focus on elements behind modal.
  function checkFocus(e: FocusEvent) {
    const path = e.composedPath();
    if (path.includes(modal)) {
      // Child of modal.
      return;
    }
    // Behind modal.
    // Set focus on first focusable modal child.
    e.preventDefault();
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }
    // No focusable childs. Focus on modal itself.
    modal.focus();
  }
</script>

<svelte:document on:keydown={checkEsc} on:focusin={checkFocus} />

<div
  use:portal={document.body}
  class="modal"
  bind:this={modal}
  transition:fade={{ delay: 0, duration: 80 }}
  on:keydown|self={checkKey}
  on:click|self={checkClick}
  aria-hidden="false"
  role="dialog"
  aria-modal="true"
  tabindex="0"
>
  <slot />
</div>

<style>
  .modal {
    overflow: auto;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: grid;
  }
</style>
