<script lang="ts">
    import { writable } from "svelte/store";
    import {
        EditOutline,
        FloppyDiskAltOutline,
        TrashBinOutline,
    } from "flowbite-svelte-icons";

    import type { CardType } from "$lib/index.ts";

    export let card: CardType;
    export let onDeleteAccessor;
    let isEditing = writable(false);

    function saveCard() {
        isEditing.set(false);
    }

    function deleteCard() {
        onDeleteAccessor.deleteCard(card);
    }

    function handleImageChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    card.illustration = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<div
    class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg border p-1 shadow-lg rsccard"
>
    <div class="absolute top-2 right-2 flex space-x-2">
        <button
            on:click={() => isEditing.update((n) => !n)}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Edit card"
        >
            {#if $isEditing}
                <FloppyDiskAltOutline
                    class="text-blue-600"
                    on:click={saveCard}
                />
            {/if}
            {#if !$isEditing}
                <EditOutline class="text-blue-600" />
            {/if}
        </button>
        <button
            on:click={deleteCard}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
        >
            <TrashBinOutline class="text-red-600" />
        </button>
    </div>

    <div class="flex-grow cardcontent p-1">
        {#if $isEditing}
            <div class="flex flex-col space-y-2">
                <input
                    type="text"
                    bind:value={card.title}
                    class="border-none p-0 text-lg font-bold focus:outline-none"
                />
                <div class="relative h-[40%]">
                    <img
                        src={card.illustration}
                        alt="Card Illustration"
                        class="h-full w-full rounded-lg object-cover"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        on:change={handleImageChange}
                        class="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <textarea
                    bind:value={card.lore}
                    class="border-none p-0 text-xs leading-tight italic focus:outline-none"
                ></textarea>
                <textarea
                    bind:value={card.effect}
                    class="h-[30%] border-none p-0 text-sm leading-tight focus:outline-none"
                ></textarea>
            </div>
        {:else}
            <div class="h-[10%] truncate text-lg font-bold">
                {card.title}
            </div>
            <div class="relative h-[40%]">
                <button
                    class="h-full w-full rounded-lg object-cover p-0 border-none"
                    aria-label="card illustration"
                    style="background: url({card.illustration}) no-repeat center/cover;"
                >
                </button>
            </div>
            <div class="truncate-2-lines h-[10%] text-xs italic">
                {card.lore}
            </div>
            <div
                class="h-[30%] overflow-hidden text-sm leading-tight text-ellipsis effect_area"
            >
                {card.effect}
            </div>

            <div class="flex h-[10%] items-center justify-between">
                {#if card.burnoutPoints}
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
                        <span class="ml-1">{card.burnoutPoints}</span>
                    </div>
                {/if}
                {#if card.cost}
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
                        <span class="ml-1">{card.cost}</span>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .card {
        width: 63.5mm;
        height: 88.9mm;
    }
    .rsccard {
        /* background-color: rgb(243, 213, 213); */
        background-color: white;
        color: black;
    }
    .cardcontent {
        /* background-color: lightgray; */
        border-radius: 5px;
        color: black;
    }
    .effect_area {
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
