<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Modal from "./modal.svelte";
  import { slide } from "svelte/transition";

  const dispatch = createEventDispatcher<{ close: null }>();
</script>

<Modal on:close={() => dispatch("close")}>
  <div
    class="bottom-sheet"
    transition:slide={{ delay: 0, duration: 120, axis: "y" }}
  >
    <slot />
  </div>
</Modal>

<style>
  .bottom-sheet {
    background-color: var(--color-background);
    position: absolute;
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    border-top: 0.1rem solid var(--color-border);
    box-shadow: 0px 0px 1rem 0.2rem var(--color-shadow);
    overflow: auto;
  }
</style>
