<script lang="ts">
	import CardList from "$lib/CardList.svelte";
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
	import { Fileupload, Button } from "flowbite-svelte";

	let files: FileList | undefined = undefined;
	let resourceCards: ResourceCardType[] = [];
	let codirEventCards: CodirEventCardType[] = [];
	let actionCards: ActionCardType[] = [];
	let projectCards: ProjectCardType[] = [];

	$: if (files) {
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

	async function saveCardsToFile() {
		writeFileContent(
			resourceCards,
			codirEventCards,
			actionCards,
			projectCards,
		);
	}
</script>

<div class="flex items-center justify-between mb-4">
	<div>
		<Fileupload id="with_helper" class="mb-2" bind:files />
	</div>
	<Button onclick={saveCardsToFile}>Save</Button>
</div>

<div class="flex min-h-screen items-center justify-center">
	<CardList
		bind:resourceCards
		bind:codirEventCards
		bind:actionCards
		bind:projectCards
	/>
</div>
