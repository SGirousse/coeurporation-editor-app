<script lang="ts">
	import { HeartOutline } from "flowbite-svelte-icons";
	import "../app.css";
	import { Navbar, NavBrand, DarkMode } from "flowbite-svelte";

	let { children } = $props();
</script>

<Navbar>
	<NavBrand href="/">
		<span
			class="flex items-center self-center text-center text-xl font-semibold whitespace-nowrap"
		>
			<HeartOutline class="mr-2" />Coeurporation
		</span>
	</NavBrand>
	<DarkMode />
</Navbar>

{@render children()}
