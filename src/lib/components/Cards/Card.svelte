<script lang="ts">
    import { writable } from "svelte/store";
    import {
        TrashBinOutline,
        BatteryOutline,
        EuroOutline,
        CartPlusAltSolid,
        ChartMixedDollarSolid,
        BugSolid,
    } from "flowbite-svelte-icons";
    import defaultIllustration from "$lib/assets/illustration/default.jpg";
    import Grade from "./Fields/Grade.svelte";
    import ImageSelector from "$lib/components/Helper/ImageSelector.svelte";

    import { coeurpormarked } from "$lib/utils/coeurpormarked";

    let { card = $bindable(), onDeleteAccessor } = $props();

    let editingField = writable<string | null>(null);
    if (card.illustration === undefined || card.illustration === "") {
        card.illustration = defaultIllustration;
    }

    function deleteCard() {
        onDeleteAccessor.deleteCard(card);
    }

    function startEditing(field: string) {
        editingField.set(field);
    }

    function stopEditing() {
        editingField.set(null);
    }
</script>

<div
    id={`card-${card.id}`}
    class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg border p-1 shadow-lg standard-card"
>
    <div class="absolute top-2 right-2 flex space-x-2 z-10">
        <button
            onclick={deleteCard}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
        >
            <TrashBinOutline class="text-red-600" />
        </button>
    </div>

    <div class="flex-grow cardcontent p-1">
        <div class="flex flex-col">
            {#if $editingField === "title"}
                <input
                    type="text"
                    placeholder="Titre"
                    bind:value={card.title}
                    class="edited border-none p-0 text-lg font-bold focus:outline-none"
                    onblur={stopEditing}
                    onkeydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <button
                    class="h-[8mm] truncate text-lg font-bold"
                    onclick={() => startEditing("title")}
                >
                    {card.title}
                </button>
            {/if}

            <div class="relative h-[34mm] mb-1">
                <ImageSelector bind:illustration={card.illustration} />

                {#if "grade" in card}
                    <div class="absolute -top-3 -right-1">
                        <Grade bind:grade={card.grade as string} />
                    </div>
                {/if}
            </div>

            <div class="relative h-[7mm]">
                {#if $editingField === "lore"}
                    <textarea
                        placeholder="Lore de la carte"
                        rows="2"
                        bind:value={card.lore}
                        class="edited border-none p-0 text-[9px] leading-tight italic focus:outline-none text-justify"
                        onblur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="truncate-2-lines text-[9px] italic text-justify"
                        onclick={() => startEditing("lore")}
                    >
                        {#await coeurpormarked(card.lore, card)}
                            <p>...parsing card effect</p>
                        {:then htmlText}
                            {@html htmlText}
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                    </div>
                {/if}
            </div>

            <div class="relative h-[27mm] mt-2">
                <div
                    class="absolute left top-0 transform -translate-y-2 text-xs flex items-center font-bold"
                >
                    Effet
                </div>
                {#if $editingField === "effect"}
                    <textarea
                        placeholder="Description de l'effet de la carte"
                        bind:value={card.effect}
                        class="p-0 pt-2 edited border-none text-[12px] leading-tight focus:outline-none text-justify"
                        onblur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="p-0 pt-2 h-full overflow-hidden text-[12px] leading-tight effect_area align-text-top text-justify preview"
                        onclick={() => startEditing("effect")}
                    >
                        {#await coeurpormarked(card.effect, card)}
                            <p>...parsing card effect</p>
                        {:then htmlText}
                            {@html htmlText}
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                    </div>
                {/if}
            </div>

            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div class="flex h-[4mm] items-center justify-between pt-1">
                <div class="w-full">
                    {#if card.cardType == "ResourceCardType"}
                        <CartPlusAltSolid />
                    {:else if card.cardType == "CodirEventCardType"}
                        <ChartMixedDollarSolid />
                    {:else if card.cardType == "ActionCardType"}
                        <BugSolid />
                    {/if}
                </div>
                {#if "burnoutPoints" in card}
                    <div class="flex items-center justify-end w-1/3">
                        <BatteryOutline />
                        {#if $editingField === "burnoutPoints"}
                            <input
                                type="number"
                                bind:value={card.burnoutPoints}
                                class="text-[12px] edited border-none p-0 leading-tight focus:outline-none footer-element"
                                placeholder="e.g. 3"
                                onblur={stopEditing}
                            />
                        {:else}
                            <button
                                class="text-[12px] footer-element"
                                onclick={() => startEditing("burnoutPoints")}
                                >{#if card.burnoutPoints}{card.burnoutPoints}{:else}0{/if}</button
                            >
                        {/if}
                    </div>
                {/if}
                {#if "cost" in card}
                    <div
                        class="flex items-center justify-end w-1/3 text-[12px]"
                    >
                        <EuroOutline size="sm" />
                        {#if $editingField === "cost"}
                            <input
                                type="number"
                                bind:value={card.cost}
                                class="text-[12px] edited border-none p-0 leading-tight focus:outline-none footer-element"
                                placeholder="e.g. 20"
                                onblur={stopEditing}
                            />
                        {:else}
                            <button
                                class="footer-element text-[12px]"
                                onclick={() => startEditing("cost")}
                                >{#if card.cost}{card.cost}{:else}0{/if}</button
                            >
                        {/if}
                        k
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .standard-card {
        background-color: white;
        color: black;
    }

    .standard-card button {
        text-align: left;
        width: 100%;
        height: 100%;
    }

    .standard-card button.footer-element {
        text-align: end;
        width: fit-content;
    }

    .standard-card textarea {
        width: 100%;
        height: 100%;
        resize: none;
    }

    .cardcontent {
        border: 1px solid black;
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
</style>
