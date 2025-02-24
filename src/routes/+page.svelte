<script lang="ts">
	import CardList from "$lib/CardList.svelte";
	import type { ResourceCardType } from "$lib/index.ts";
	import { Fileupload, Button } from "flowbite-svelte";

	let files: FileList | undefined = undefined;
	let resourceCards: ResourceCardType[] = [];

	$: if (files) {
		resourceCards = [];
		console.log(files);
		for (const file of files) {
			const reader = new FileReader();
			reader.onload = () => {
				const cardsData = JSON.parse(reader.result as string);
				for (const cardData of cardsData) {
					const resourceCard: ResourceCardType = {
						title: cardData.title || "Default Title",
						grade: cardData.grade || "A",
						illustration: cardData.illustration || "",
						lore: cardData.lore || "Default short effect.",
						effect: cardData.effect || "Default long text.",
						burnoutPoints: cardData.burnoutPoints || 0,
						cost: cardData.cost || "0k",
					};
					console.log(cardData);
					resourceCards = [...resourceCards, resourceCard];
				}
			};
			reader.readAsText(file);
		}
		files = undefined;
	}

	async function convertImageToBase64(imageUrl: string): Promise<string> {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			if (reader.result) {
				reader.onloadend = () => resolve(reader.result as string);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			}
		});
	}

	async function saveCardsToFile() {
		const cardsWithBase64Images = await Promise.all(
			resourceCards.map(async (resourceCard) => {
				if (
					resourceCard.illustration &&
					!resourceCard.illustration.startsWith("data:")
				) {
					resourceCard.illustration = await convertImageToBase64(
						resourceCard.illustration,
					);
				}
				return resourceCard;
			}),
		);

		const json = JSON.stringify(cardsWithBase64Images, null, 2);
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "cards.json";
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="flex items-center justify-between mb-4">
	<div>
		<Fileupload id="with_helper" class="mb-2" bind:files />
	</div>
	<Button onclick={saveCardsToFile}>Save</Button>
</div>

<div class="flex min-h-screen items-center justify-center">
	<CardList bind:resourceCards />
</div>
