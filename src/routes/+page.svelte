<script lang="ts">
	import CardList from '$lib/CardList.svelte';
	import { Fileupload, Label, Helper, Button } from 'flowbite-svelte';
  
	interface Card {
	  title: string;
	  badge: string;
	  imageSrc: string;
	  shortDescription: string;
	  longText: string;
	  batteryValue: number;
	  moneyValue: string;
	}
  
	let files: FileList | null = null;
	let resourceCards: Card[] = [];
  
	$: if (files) {
		resourceCards = [];
		console.log(files);
	  for (const file of files) {
		const reader = new FileReader();
		reader.onload = () => {
		  const cardsData = JSON.parse(reader.result as string);
		  for (const cardData of cardsData) {
			const resourceCard: Card = {
			  title: cardData.title || 'Default Title',
			  badge: cardData.badge || 'A',
			  imageSrc: cardData.imageSrc || '',
			  shortDescription: cardData.shortDescription || 'Default short description.',
			  longText: cardData.longText || 'Default long text.',
			  batteryValue: cardData.batteryValue || 0,
			  moneyValue: cardData.moneyValue || '0k'
			};
			console.log(cardData)
			resourceCards = [...resourceCards, resourceCard];
		  }
		};
		reader.readAsText(file);
	  }
	  files = null;
	}
  
	async function convertImageToBase64(imageUrl) {
	  const response = await fetch(imageUrl);
	  const blob = await response.blob();
	  return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	  });
	}
  
	async function saveCardsToFile() {
	  const cardsWithBase64Images = await Promise.all(resourceCards.map(async resourceCard => {
		if (resourceCard.imageSrc && !resourceCard.imageSrc.startsWith('data:')) {
		  resourceCard.imageSrc = await convertImageToBase64(resourceCard.imageSrc);
		}
		return resourceCard;
	  }));
  
	  const json = JSON.stringify(cardsWithBase64Images, null, 2);
	  const blob = new Blob([json], { type: 'application/json' });
	  const url = URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.href = url;
	  a.download = 'cards.json';
	  a.click();
	  URL.revokeObjectURL(url);
	}
  </script>
  
  <div class="flex items-center justify-between mb-4">
	<div>
	  <Label for="with_helper" class="pb-2">Upload file</Label>
	  <Fileupload id="with_helper" class="mb-2" bind:files={files} />
	  <Helper>JSON</Helper>
	</div>
	<Button on:click={saveCardsToFile}>Save</Button>
  </div>
  
  <div class="flex min-h-screen items-center justify-center">
	<CardList bind:resourceCards />
  </div>