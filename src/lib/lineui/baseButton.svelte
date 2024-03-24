<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let stopPropagation = false;
	export let focused = false;

	let buttEl: HTMLButtonElement;

	onMount(() => {
		if (focused) {
			buttEl.focus();
		}
	});

	const dispatch = createEventDispatcher<{ click: null }>();

	function checkKey(e: KeyboardEvent) {
		if (e.key == 'Enter' || e.key == 'Space') {
			if (stopPropagation) {
				e.stopPropagation();
			}
			dispatch('click');
		}
	}

	function checkPointer(e: MouseEvent) {
		if (stopPropagation) {
			e.stopPropagation();
		}
		dispatch('click');
	}
</script>

<button class="base-button" bind:this={buttEl} on:keydown={checkKey} on:click={checkPointer}>
	<slot />
</button>

<style>
	.base-button {
		/* reset browser styles */
		background-color: transparent;
		border: 0;
		text-align: unset;
		font: unset;
		height: unset;
		width: unset;
		margin: 0;
		padding: 0;
		/* custom */
		cursor: pointer;
		height: inherit;
		width: inherit;
	}
</style>
