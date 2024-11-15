<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen grid grid-rows-[auto_1fr]">
	<Navbar />
	<main class=" flex flex-col justify-center items-center">
		{@render children()}
	</main>
</div>
