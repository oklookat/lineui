<script lang="ts">
  import "./style.css";
</script>

<div class="container">
  <slot />
</div>

<style>
  .container {
    container-type: inline-size;
    min-height: 100vh;
    color: var(--color-text);
    background-color: var(--color-background);
  }
</style>
