<script lang="ts">
    import { writable } from "svelte/store";
    import {
        EditOutline,
        FloppyDiskAltOutline,
        TrashBinOutline,
    } from "flowbite-svelte-icons";

    import type { ActionCardType } from "$lib/index.ts";

    export let actionCard: ActionCardType;
    export let onDeleteAccessor;
    let isEditing = writable(false);

    function saveCard() {
        isEditing.set(false);
    }

    function deleteCard() {
        onDeleteAccessor.deleteActionCard(actionCard);
    }

    function handleImageChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    actionCard.illustration = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<div
    class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg border p-4 shadow-lg rsccard"
>
    <div class="absolute top-2 right-2 flex space-x-2">
        <button
            on:click={() => isEditing.update((n) => !n)}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
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

    {#if $isEditing}
        <div class="flex flex-col space-y-2">
            <input
                type="text"
                bind:value={actionCard.title}
                class="border-none p-0 text-lg font-bold focus:outline-none"
            />
            <div class="relative h-[40%]">
                <img
                    src={actionCard.illustration}
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
                bind:value={actionCard.lore}
                class="border-none p-0 text-xs leading-tight italic focus:outline-none"
            ></textarea>
            <textarea
                bind:value={actionCard.effect}
                class="h-[30%] border-none p-0 text-sm leading-tight focus:outline-none"
            ></textarea>
        </div>
    {:else}
        <div class="h-[10%] truncate text-lg font-bold">
            {actionCard.title}
        </div>
        <div class="relative h-[40%]">
            <img
                src={actionCard.illustration}
                alt="Card Illustration"
                class="h-full w-full rounded-lg object-cover"
            />
        </div>
        <div class="truncate-2-lines h-[10%] text-xs italic">
            {actionCard.lore}
        </div>
        <div
            class="h-[30%] overflow-hidden text-sm leading-tight text-ellipsis"
        >
            {actionCard.effect}
        </div>
    {/if}
</div>

<style>
    .actionCard {
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
