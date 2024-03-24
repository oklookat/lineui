<script lang="ts" context="module">
	export type NavbarElement = {
		title: string;
		link: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Modal from './modal.svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher<{ close: null }>();

	export let elements: NavbarElement[];

	let nav: HTMLElement;

	let lastFocus: Element | null = null;

	onMount(() => {
		lastFocus = document.activeElement;
		if (nav.firstChild && nav.firstChild instanceof HTMLElement) {
			nav.firstChild.focus();
		}
	});
	onDestroy(() => {
		if (lastFocus && 'focus' in lastFocus && typeof lastFocus['focus'] == 'function') {
			lastFocus.focus();
		}
	});
</script>

<Modal on:close={() => dispatch('close')}>
	<nav transition:slide={{ delay: 0, duration: 80, axis: 'x' }} bind:this={nav}>
		{#each elements as element}
			<a href={element.link}>{element.title}</a>
		{/each}
	</nav>
</Modal>

<style>
	nav {
		overflow: auto;
		height: 100%;
		width: 50%;
		border-right: 0.1rem solid var(--color-border);
		background-color: var(--color-background);
		box-shadow: 0px 0px 1rem 0.2rem var(--color-shadow);
	}

	a {
		width: 100%;
		min-height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 0.1rem solid var(--color-border);
		font-weight: bold;
		white-space: nowrap;
	}
</style>
