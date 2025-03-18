<script lang="ts">
	import "../app.css";
	import CustomNavbar from "$lib/components/CustomNavbar.svelte";

	let { children } = $props();
</script>

<CustomNavbar />
<div class="mt-16">
	{@render children()}
</div>
