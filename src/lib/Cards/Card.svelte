<script lang="ts">
    import { writable } from "svelte/store";
    import {
        EditOutline,
        FloppyDiskAltOutline,
        TrashBinOutline,
        DollarOutline,
        BatteryOutline,
    } from "flowbite-svelte-icons";

    import type { CardType } from "$lib/index.ts";

    export let card: CardType;
    export let onDeleteAccessor;
    let isEditing = writable(false);
    let editingField = writable<string | null>(null);

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

    function startEditing(field: string) {
        editingField.set(field);
    }

    function stopEditing() {
        editingField.set(null);
    }
</script>

<div
    class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg border p-1 shadow-lg rsccard"
>
    <div class="absolute top-2 right-2 flex space-x-2 z-10">
        <button
            on:click={deleteCard}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
        >
            <TrashBinOutline class="text-red-600" />
        </button>
    </div>

    <div class="flex-grow cardcontent p-1">
        <div class="flex flex-col space-y-2">
            {#if $editingField === "title"}
                <input
                    type="text"
                    bind:value={card.title}
                    class="border-none p-0 text-lg font-bold focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <div
                    class="h-[10%] truncate text-lg font-bold"
                    on:click={() => startEditing("title")}
                >
                    {card.title}
                </div>
            {/if}

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

            {#if $editingField === "lore"}
                <textarea
                    bind:value={card.lore}
                    class="border-none p-0 text-xs leading-tight italic focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                ></textarea>
            {:else}
                <div
                    class="truncate-2-lines h-[10%] text-xs italic"
                    on:click={() => startEditing("lore")}
                >
                    {card.lore}
                </div>
            {/if}

            {#if $editingField === "effect"}
                <textarea
                    bind:value={card.effect}
                    class="h-[30%] border-none p-0 text-sm leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                ></textarea>
            {:else}
                <div
                    class="h-[30%] overflow-hidden text-sm leading-tight text-ellipsis effect_area"
                    on:click={() => startEditing("effect")}
                >
                    {card.effect}
                </div>
            {/if}
        </div>
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
