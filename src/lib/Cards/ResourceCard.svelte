<script lang="ts">
	import { writable } from "svelte/store";
	import { EditOutline, FloppyDiskAltOutline } from "flowbite-svelte-icons";
	import { createEventDispatcher } from "svelte";

	import type { ResourceCardType } from "$lib/index.ts";

	export let resourceCard: ResourceCardType;

	const dispatch = createEventDispatcher();
	let isEditing = writable(false);

	function saveCard() {
		dispatch("updateCard", resourceCard);
		isEditing.set(false);
	}

	function handleImageChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					resourceCard.illustration = reader.result as string;
				}
			};
			reader.readAsDataURL(file);
		}
	}

	$: gradeColor =
		resourceCard.grade === "A"
			? "bg-green-500"
			: resourceCard.grade === "B"
				? "bg-blue-500"
				: resourceCard.grade === "C"
					? "bg-yellow-500"
					: resourceCard.grade === "D"
						? "bg-orange-500"
						: resourceCard.grade === "Stg"
							? "bg-purple-500"
							: "bg-gray-500";
</script>

<div
	class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg border p-4 shadow-lg rsccard"
>
	<button
		on:click={() => isEditing.update((n) => !n)}
		class="absolute top-2 right-2 rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
	>
		{#if $isEditing}
			<FloppyDiskAltOutline class="text-blue-600" on:click={saveCard} />
		{/if}
		{#if !$isEditing}
			<EditOutline class="text-blue-600" />
		{/if}
	</button>

	{#if $isEditing}
		<div class="flex flex-col space-y-2">
			<input
				type="text"
				bind:value={resourceCard.title}
				class="border-none p-0 text-lg font-bold focus:outline-none"
			/>
			<div class="relative h-[40%]">
				<img
					src={resourceCard.illustration}
					alt="Card Illustration"
					class="h-full w-full rounded-lg object-cover"
				/>
				<input
					type="file"
					accept="image/*"
					on:change={handleImageChange}
					class="absolute inset-0 opacity-0 cursor-pointer"
				/>
				<input
					type="text"
					bind:value={resourceCard.grade}
					class="absolute -top-3 -right-3 {gradeColor} flex h-8 w-8 items-center justify-center rounded-full text-white text-center focus:outline-none"
				/>
			</div>
			<textarea
				bind:value={resourceCard.lore}
				class="border-none p-0 text-xs leading-tight italic focus:outline-none"
			></textarea>
			<textarea
				bind:value={resourceCard.effect}
				class="h-[30%] border-none p-0 text-sm leading-tight focus:outline-none"
			></textarea>
			<div class="flex h-[10%] items-center justify-between">
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-500"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v8h12V6zM6 8h2v4H6V8zm4 0h2v4h-2V8z"
						></path>
					</svg>
					<input
						type="number"
						bind:value={resourceCard.burnoutPoints}
						class="ml-1 w-12 border-none p-0 focus:outline-none"
					/>
				</div>
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-500"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"
						></path>
					</svg>
					<input
						type="text"
						bind:value={resourceCard.cost}
						class="ml-1 w-16 border-none p-0 focus:outline-none"
					/>
				</div>
			</div>
		</div>
	{:else}
		<div class="h-[10%] truncate text-lg font-bold">
			{resourceCard.title}
		</div>
		<div class="relative h-[40%]">
			<img
				src={resourceCard.illustration}
				alt="Card Illustration"
				class="h-full w-full rounded-lg object-cover"
			/>
			<div
				class="absolute -top-3 -right-3 {gradeColor} flex h-8 w-8 items-center justify-center rounded-full text-white"
			>
				{resourceCard.grade}
			</div>
		</div>
		<div class="truncate-2-lines h-[10%] text-xs italic">
			{resourceCard.lore}
		</div>
		<div
			class="h-[30%] overflow-hidden text-sm leading-tight text-ellipsis"
		>
			{resourceCard.effect}
		</div>
		<div class="flex h-[10%] items-center justify-between">
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v8h12V6zM6 8h2v4H6V8zm4 0h2v4h-2V8z"
					></path>
				</svg>
				<span class="ml-1">{resourceCard.burnoutPoints}</span>
			</div>
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"
					></path>
				</svg>
				<span class="ml-1">{resourceCard.cost}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.resourceCard {
		width: 63.5mm;
		height: 88.9mm;
	}
	.rsccard {
		background-color: white;
		color: black;
	}

	.truncate {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.truncate-2-lines {
		display: -webkit-box;
		-webkit-line-clamp: 2; /* Number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.text-ellipsis {
		display: -webkit-box;
		-webkit-line-clamp: 3; /* Number of lines to show */
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
