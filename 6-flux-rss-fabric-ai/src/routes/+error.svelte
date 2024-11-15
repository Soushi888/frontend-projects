<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="space-y-4 text-center">
	<h1 class="h1 text-red-600">Error {$page.status}</h1>
	<h2 class="h2">{$page.error?.message}</h2>
</div>
