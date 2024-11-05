<script lang="ts">
	import Navbar from '$components/navbar.svelte';
	import '$lib/style.css';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
</script>

<Navbar />

<main>
	{@render children()}
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
