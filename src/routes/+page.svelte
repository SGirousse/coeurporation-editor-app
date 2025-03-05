<script lang="ts">
	import CardLists from "$lib/components/CardsManager/CardLists.svelte";
	import type {
		ResourceCardType,
		CodirEventCardType,
		ActionCardType,
		ProjectCardType,
	} from "$lib/index.ts";
	import {
		readFileContent,
		writeFileContent,
	} from "$lib/utils/cardsFileHelper";
	import { cardsToPngsZipped } from "$lib/utils/cardsExport2Print";
	import {
		Fileupload,
		Button,
		Navbar,
		NavBrand,
		DarkMode,
	} from "flowbite-svelte";
	import { HeartOutline } from "flowbite-svelte-icons";

	let files: FileList | undefined = $state();
	let resourceCards: ResourceCardType[] = $state([]);
	let codirEventCards: CodirEventCardType[] = $state([]);
	let actionCards: ActionCardType[] = $state([]);
	let projectCards: ProjectCardType[] = $state([]);

	async function saveCardsToFile() {
		writeFileContent(
			resourceCards,
			codirEventCards,
			actionCards,
			projectCards,
		);
	}

	async function exportCardsForPrint() {
		const allCards = [...resourceCards, ...codirEventCards, ...actionCards];
		cardsToPngsZipped(allCards, projectCards);
	}

	$effect(() => {
		if (files) {
			readFileContent(files).then(
				({
					resourceCards: newResourceCards,
					codirEventCards: newCodirEventCards,
					actionCards: newActionCards,
					projectCards: newProjectCards,
				}) => {
					resourceCards = newResourceCards;
					codirEventCards = newCodirEventCards;
					actionCards = newActionCards;
					projectCards = newProjectCards;
				},
			);
			files = undefined;
		}
	});
</script>

<Navbar class="fixed top-0 w-full z-100 h-16">
	<NavBrand href="/">
		<span
			class="flex items-center self-center text-center text-xl font-semibold whitespace-nowrap"
		>
			<HeartOutline class="mr-2" />Coeurporation
		</span>
	</NavBrand>
	<div class="flex items-center justify-between mb-4 space-x-2">
		<div>
			<Fileupload id="with_helper" bind:files />
		</div>
		<div class="flex items-center space-x-2">
			<Button onclick={saveCardsToFile}>Save</Button>
			<Button onclick={exportCardsForPrint}>Print</Button>
		</div>
		<DarkMode />
	</div>
</Navbar>

<div class="mt-16 flex items-center justify-center">
	<CardLists
		bind:resourceCards
		bind:codirEventCards
		bind:actionCards
		bind:projectCards
	/>
</div>
