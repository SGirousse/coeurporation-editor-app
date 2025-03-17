<script lang="ts">
    import { writable } from "svelte/store";
    import {
        TrashBinOutline,
        BitcoinSolid,
        AwardSolid,
        RocketOutline,
        EuroOutline,
    } from "flowbite-svelte-icons";
    import Grade from "./Fields/Grade.svelte";
    import { coeurpormarked } from "$lib/utils/coeurpormarked";
    import type { ClientType } from "$lib";

    let { card = $bindable(), onDeleteAccessor, clients } = $props();

    function deleteCard() {
        onDeleteAccessor.deleteCard(card);
    }

    async function handleSelectChange(event: any) {
        updateClientValue(event.target.value);
    }

    async function updateClientValue(clientId: string) {
        const selectedClient = clients.find(
            (client: ClientType) => client.id === clientId,
        );

        if (selectedClient) {
            card.client = selectedClient.id;
            card.illustration = selectedClient.illustration;
        } else {
            card.client = clients[0].id;
            card.illustration = clients[0].illustration;
        }
    }

    let editingField = writable<string | null>(null);

    function startEditing(field: string) {
        editingField.set(field);
    }

    function stopEditing() {
        editingField.set(null);
    }

    $effect(() => {
        updateClientValue(card.client);
    });
</script>

<div
    id={`card-${card.id}`}
    class="group relative flex h-[70mm] w-[120mm] flex-col rounded-lg border p-1 shadow-lg project-card"
>
    <div class="absolute top-2 right-2 flex space-x-2 z-10">
        <button
            onclick={deleteCard}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
        >
            <TrashBinOutline class="text-red-600" />
        </button>
    </div>

    <div class="flex-grow flex cardcontent p-1">
        <!-- Left part with text data -->
        <div class="flex flex-col w-[93mm] m-0 mr-2">
            <div class="relative h-[6mm] w-full">
                {#if $editingField === "title"}
                    <input
                        type="text"
                        bind:value={card.title}
                        class="w-full edited border-none p-0 text-lg font-bold focus:outline-none"
                        onblur={stopEditing}
                        onkeydown={(e) => e.key === "Enter" && stopEditing()}
                    />
                {:else}
                    <button
                        class="w-full truncate text-lg font-bold"
                        onclick={() => startEditing("title")}
                    >
                        {card.title}
                    </button>
                {/if}
            </div>

            <div class="h-[9mm]">
                {#if $editingField === "lore"}
                    <textarea
                        bind:value={card.lore}
                        class="edited border-none p-0 text-xs leading-tight italic focus:outline-none resize-none w-full h-full"
                        onblur={stopEditing}
                    ></textarea>
                {:else}
                    <button
                        class="w-full truncate-2-lines text-xs italic top-0"
                        onclick={() => startEditing("lore")}
                    >
                        {#await coeurpormarked(card.lore, card, clients)}
                            <p>...parsing card effect</p>
                        {:then htmlText}
                            {@html htmlText}
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                    </button>
                {/if}
            </div>

            <div class="h-[27mm] relative mt-2">
                <div
                    class="absolute left top-0 transform -translate-y-2 text-xs flex items-center font-bold"
                >
                    Effet
                </div>
                {#if $editingField === "effect"}
                    <textarea
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
                        {#await coeurpormarked(card.effect, card, clients)}
                            <p>...parsing card effect</p>
                        {:then htmlText}
                            {@html htmlText}
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                    </div>
                {/if}
            </div>
            <div class="h-[18mm] relative mt-2">
                <div
                    class="absolute left top-0 transform -translate-y-2 text-xs flex items-center font-bold"
                >
                    Penalty effect (
                    {#if $editingField === "penaltyThreshold"}
                        <input
                            type="number"
                            bind:value={card.penaltyThreshold}
                            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                            onblur={stopEditing}
                        />
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="text-[12px] leading-tight"
                            onclick={() => startEditing("penaltyThreshold")}
                        >
                            {card.penaltyThreshold}
                        </div>
                    {/if}
                    )
                </div>

                {#if $editingField === "penaltyEffect"}
                    <textarea
                        bind:value={card.penaltyEffect}
                        class="p-0 pt-2 edited border-none text-[12px] leading-tight focus:outline-none text-justify"
                        onblur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="p-0 pt-2 h-full overflow-hidden text-[12px] leading-tight effect_area align-text-top text-justify preview"
                        onclick={() => startEditing("penaltyEffect")}
                    >
                        {#await coeurpormarked(card.penaltyEffect, card, clients)}
                            <p>...parsing card effect</p>
                        {:then htmlText}
                            {@html htmlText}
                        {:catch error}
                            <p style="color: red">{error.message}</p>
                        {/await}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Right part with illustration / number data -->
        <div class="relative w-[22mm]">
            <img
                src={card.illustration}
                alt="Project Illustration"
                class="h-[22mm] rounded-full"
            />
            <div class="leading-tight text-center">
                <select
                    name="clients"
                    class="compact-select"
                    onchange={handleSelectChange}
                >
                    {#each clients as client, _}
                        <option
                            value={client.id}
                            selected={card.client === client.id}
                            >{client.name}</option
                        >
                    {/each}
                </select>
            </div>

            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />

            <!-- Values section -->
            <div class="grid grid-cols-2 gap-1 mt-2 mb-2">
                <div
                    class="flex items-center justify-start text-[12px] leading-tight"
                >
                    <EuroOutline />
                    {#if $editingField === "baseRevenue"}
                        <input
                            type="number"
                            bind:value={card.baseRevenue}
                            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                            onblur={stopEditing}
                        />
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div onclick={() => startEditing("baseRevenue")}>
                            {card.baseRevenue}
                        </div>
                    {/if}k
                </div>
                <div
                    class="flex items-center justify-start text-[12px] leading-tight"
                >
                    <AwardSolid />
                    {#if $editingField === "reputation"}
                        <input
                            type="number"
                            bind:value={card.reputation}
                            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                            onblur={stopEditing}
                        />
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div onclick={() => startEditing("reputation")}>
                            {card.reputation}
                        </div>
                    {/if}
                </div>
                <div
                    class="flex items-center justify-start text-[12px] leading-tight"
                >
                    <BitcoinSolid />
                    {#if $editingField === "optimalRevenue"}
                        <input
                            type="number"
                            bind:value={card.optimalRevenue}
                            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                            onblur={stopEditing}
                        />
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div onclick={() => startEditing("optimalRevenue")}>
                            {card.optimalRevenue}
                        </div>
                    {/if}k
                </div>
                <div
                    class="flex items-center justify-start text-[12px] leading-tight"
                >
                    <RocketOutline />
                    <div>
                        {clients.find(
                            (client: ClientType) => client.id === card.client,
                        )?.comboThreshold}
                    </div>
                </div>
            </div>

            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />

            <!-- Staffing section -->
            <div class="flex flex-wrap pt-1">
                {#each card.optimalStaffing as _, index}
                    <div class="m-[1px]">
                        <!-- svelte-ignore binding_property_non_reactive -->
                        <Grade bind:grade={card.optimalStaffing[index]} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .project-card {
        background-color: white;
        color: black;
    }

    .project-card .edited {
        background-color: rgb(197, 197, 197);
    }

    .project-card button {
        text-align: left;
    }

    .project-card textarea {
        width: 100%;
        height: 100%;
        resize: none;
    }

    .cardcontent {
        border: 1px solid black;
        border-radius: 5px;
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
