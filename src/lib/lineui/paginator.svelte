<script lang="ts">
	import BaseButton from './baseButton.svelte';
	import Tooltip from './tooltip.svelte';

	export let offset: number;
	export let limit: number;
	export let total: number;
	export let setPage: (limit: number, offset: number) => Promise<void>;
	let _offset = offset;
	let _limit = limit;
	let _total = total;

	let currentPage = 1;
	let totalPages = 1;
	$: offset, updatePagesInfo();
	$: _limit, updatePagesInfo();
	$: _total, updatePagesInfo();
	function updatePagesInfo() {
		totalPages = getTotalPages();
		currentPage = getCurrentPage();
	}
	function getTotalPages(): number {
		if (_total < 1 || _limit < 1) {
			return 1;
		}
		return Math.ceil(_total / _limit);
	}
	function getCurrentPage(): number {
		if (_total < 1 || _limit < 1) {
			return 1;
		}
		return Math.floor(_offset / _limit) + 1;
	}
	function pageToLimitOffset(page: number): { limit: number; offset: number } {
		if (_total < 1 || _limit < 1) {
			return { limit: 10, offset: 0 };
		}

		const limit = _limit;
		const offset = _limit * (page - 1);

		return { limit, offset };
	}
	function isPageValid(page: number): boolean {
		if (page == currentPage || isNaN(page) || page < 1 || page > totalPages) {
			return false;
		}
		return true;
	}

	let inputTime: number;
	let input: HTMLInputElement;
	function onInput(e: Event) {
		const evt = e as InputEvent;
		if (!evt.target || !('value' in evt.target) || typeof evt.target.value != 'string') {
			return;
		}
		const page = parseInt(evt.target.value, 10);
		tryChangePage(page);
	}

	function tryChangePage(page: number, now = false) {
		if (!isPageValid(page)) {
			return;
		}
		const tTime = now ? 0 : 1000;
		clearTimeout(inputTime);
		inputTime = setTimeout(async () => {
			const { limit, offset } = pageToLimitOffset(page);
			try {
				await setPage(limit, offset);
				currentPage = page;
			} catch (e) {
				console.error('paginator set page:', e);
				input.value = currentPage.toString();
			}
		}, tTime);
	}
</script>

<div class="paginator">
	{#if currentPage > 1}
		<span class="prev">
			<BaseButton
				on:click={() => {
					tryChangePage(currentPage - 1, true);
				}}
			>
				⬅️
			</BaseButton>
		</span>
	{/if}
	<div class="page">
		<Tooltip>
			<div slot="content" class="total">{currentPage}/{totalPages}</div>
			<input
				bind:this={input}
				value={currentPage}
				class="current"
				type="number"
				placeholder="Page"
				min="1"
				max={totalPages}
				on:input={onInput}
			/>
		</Tooltip>
	</div>
	{#if totalPages > currentPage}
		<span class="next">
			<BaseButton
				on:click={() => {
					tryChangePage(currentPage + 1, true);
				}}
				>➡️
			</BaseButton>
		</span>
	{/if}
</div>

<style>
	.paginator {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-areas: 'a b c';
		border: 0.1rem solid var(--color-border);
		height: 4rem;
		width: 100%;

		& .prev {
			grid-area: a;
		}

		& .next {
			grid-area: c;
		}

		& .page {
			grid-area: b;
			& .current {
				border: 0;
				height: 100%;
				width: 100%;
				font-size: 100%;
				padding: 0.4rem;
				overflow: auto;
				font-size: 1.5rem;
			}
			& .total {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
		}

		& .prev,
		& .next {
      text-align: center;
			&:hover {
				background-color: var(--color-hover);
			}
			font-size: 1.5rem;
      & > * {
        height: 100%;
        width: 100%;
      }
		}
	}
</style>
