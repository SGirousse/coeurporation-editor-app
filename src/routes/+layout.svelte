<script lang="ts">
	import "../app.css";
	import { Navbar, NavBrand, DarkMode } from "flowbite-svelte";

	let { children } = $props();
</script>

<Navbar>
	<NavBrand href="/">
		<!-- <img src="/path/to/logo.png" alt="Logo" class="h-8 mr-3" /> -->
		<span class="self-center text-xl font-semibold whitespace-nowrap"
			>Coeurporation</span
		>
	</NavBrand>
	<DarkMode />
</Navbar>

{@render children()}
