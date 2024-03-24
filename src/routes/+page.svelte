<script lang="ts">
	import BaseButton from '$lib/lineui/baseButton.svelte';
	import Container from '$lib/lineui/container.svelte';
	import HamburgerIcon from '$lib/lineui/hamburger_icon.svelte';
	import Header from '$lib/lineui/header.svelte';
	import Modal from '$lib/lineui/modal.svelte';
	import ModalBottomSheet from '$lib/lineui/modal_bottom_sheet.svelte';
	import Paginator from '$lib/lineui/paginator.svelte';

	let modalOn = false;
	let modalBottomOn = false;

	const headerElements = [
		{
			link: '/lineui',
			title: 'lineui'
		},
		{
			link: 'https://apple.com',
			title: 'Apple'
		},
		{
			link: 'https://google.com',
			title: 'Google'
		},
		{
			link: 'https://microsoft.com',
			title: 'Microsoft'
		}
	];
</script>

<Container>
	Header (+ hamburger icon + navbar on mobile screen):
	<Header elements={headerElements}></Header>
	<main>
		<h2>We in Container</h2>

		<div class="hamb">
			<h3>Hamburger icon (2rem):</h3>
			<div><HamburgerIcon></HamburgerIcon></div>
		</div>

		<div>
			<h3>Paginator (and Tooltip on hover page number)</h3>
			<Paginator limit={30} offset={0} setPage={async () => {}} total={80}></Paginator>
		</div>

		<div>
			<h3>Base button + Modal with content</h3>
			<BaseButton on:click={() => (modalOn = true)}>CLICK HERE</BaseButton>
		</div>

		<div>
			<h3>Base button + Modal bottom sheet</h3>
			<BaseButton on:click={() => (modalBottomOn = true)}>CLICK HERE</BaseButton>
		</div>
	</main>
</Container>

{#if modalOn}
	<Modal on:close={() => (modalOn = false)}>
		<div class="modal-content">This is Modal + div with styles.</div>
	</Modal>
{/if}

{#if modalBottomOn}
	<ModalBottomSheet on:close={() => (modalBottomOn = false)}>
		<div class="modal-bottom-content">This is modal bottom sheet.</div>
	</ModalBottomSheet>
{/if}

<style>
	.modal-content {
		height: 50vh;
		width: 50vw;
		background-color: var(--color-background);
		border: 1px solid var(--color-border);

		align-self: center;
		justify-self: center;
	}
	main {
		margin-left: 0.4rem;
		margin-right: 0.4rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.hamb {
		display: flex;
		gap: 0.5rem;
		& div {
			width: 2rem;
			height: 2rem;
		}
	}
</style>
