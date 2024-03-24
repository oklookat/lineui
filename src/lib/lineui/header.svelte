<script lang="ts" context="module">
	export type HeaderElement = {
		title: string;
		link: string;
	};
</script>

<script lang="ts">
	import BaseButton from '$lib/lineui/baseButton.svelte';
	import HamburgerIcon from '$lib/lineui/hamburger_icon.svelte';
	import Navbar from './navbar.svelte';

	let showModal = false;

	export let elements: HeaderElement[] = [];
</script>

<header>
	<div class="mobile">
		<div class="hamburger">
			<BaseButton on:click={() => (showModal = !showModal)}>
				<HamburgerIcon></HamburgerIcon>
			</BaseButton>
		</div>
		{#if elements.length > 0}
			<a href={elements[0].link}>{elements[0].title}</a>
		{/if}
	</div>

	<div class="desktop">
		{#each elements as el}
			<a href={el.link}>{el.title}</a>
		{/each}
	</div>

	{#if showModal}
		<Navbar {elements} on:close={() => (showModal = false)}></Navbar>
	{/if}
</header>

<style>
	.desktop,
	.mobile {
		min-height: 3rem;
		width: 100%;
		display: none;
		flex-wrap: wrap;
	}

	.desktop {
		display: flex;
		height: max-content;
		@container (min-width: 30rem) {
			display: flex;
		}
	}

	.mobile {
		justify-content: center;
		align-items: center;
		@container (max-width: 30rem) {
			display: flex;
		}
		& > .hamburger {
			height: 2rem;
			width: 2rem;
			position: absolute;
			left: 0;
			margin-left: 0.4rem;
		}
	}

	a {
		padding: 0.4rem;
		cursor: pointer;
		font-weight: bold;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
</style>
