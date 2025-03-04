<script lang="ts">
    import { writable } from "svelte/store";
    import {
        TrashBinOutline,
        BitcoinSolid,
        DollarOutline,
        AwardSolid,
    } from "flowbite-svelte-icons";
    import { marked } from "marked";
    import Grade from "./Component/Grade.svelte";
    import type { ProjectCardType } from "$lib/index.ts";

    import logo_cebocorp from "$lib/assets/companies/logo/001_cebocorp.png";
    import logo_fullcarburant from "$lib/assets/companies/logo/002_fullcarburant.png";
    import logo_etatfroncais from "$lib/assets/companies/logo/003_etatfroncais.png";
    import logo_superkopter from "$lib/assets/companies/logo/004_superkopter.png";
    import logo_laklass from "$lib/assets/companies/logo/005_laklass.png";
    import logo_novosanst from "$lib/assets/companies/logo/006_novosanst.png";
    import logo_telko from "$lib/assets/companies/logo/007_telko.png";
    import logo_flycar from "$lib/assets/companies/logo/008_flycar.png";
    import logo_turbomotor from "$lib/assets/companies/logo/009_turbomotor.png";
    import logo_moulabank from "$lib/assets/companies/logo/010_moulabank.png";

    export let projectCard: ProjectCardType;
    export let onDeleteAccessor: any;

    const clients = [
        { id: "001", name: "Cébo Corp", file: logo_cebocorp },
        { id: "002", name: "FullCarburant", file: logo_fullcarburant },
        { id: "003", name: "Etat Fronçais", file: logo_etatfroncais },
        { id: "004", name: "SuperKopter", file: logo_superkopter },
        { id: "005", name: "La Klass", file: logo_laklass },
        { id: "006", name: "Novo Sans T", file: logo_novosanst },
        { id: "007", name: "TELKO", file: logo_telko },
        { id: "008", name: "FlyCar", file: logo_flycar },
        { id: "009", name: "Turbo Motor", file: logo_turbomotor },
        { id: "010", name: "Moula Bank", file: logo_moulabank },
    ];

    updateClientValue(projectCard.client);

    function deleteCard() {
        onDeleteAccessor.deleteProjectCard(projectCard);
    }

    async function handleSelectChange(event: any) {
        updateClientValue(event.target.value);
    }

    async function updateClientValue(clientId: string) {
        const selectedClient = clients.find((client) => client.id === clientId);

        if (selectedClient) {
            projectCard.client = selectedClient.id;
            projectCard.illustration = selectedClient.file;
        } else {
            projectCard.client = "";
        }
    }

    let editingField = writable<string | null>(null);

    function startEditing(field: string) {
        editingField.set(field);
    }

    function stopEditing() {
        editingField.set(null);
    }
</script>

<div
    class="group relative flex h-[70mm] w-[120mm] flex-col rounded-lg border p-1 shadow-lg project-card"
>
    <div class="absolute top-2 right-2 flex space-x-2 z-10">
        <button
            on:click={deleteCard}
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
                        bind:value={projectCard.title}
                        class="w-full edited border-none p-0 text-lg font-bold focus:outline-none"
                        on:blur={stopEditing}
                        on:keydown={(e) => e.key === "Enter" && stopEditing()}
                    />
                {:else}
                    <button
                        class="w-full truncate text-lg font-bold"
                        on:click={() => startEditing("title")}
                    >
                        {projectCard.title}
                    </button>
                {/if}
            </div>

            <div class="h-[9mm]">
                {#if $editingField === "lore"}
                    <textarea
                        bind:value={projectCard.lore}
                        class="edited border-none p-0 text-xs leading-tight italic focus:outline-none resize-none w-full h-full"
                        on:blur={stopEditing}
                    ></textarea>
                {:else}
                    <button
                        class="w-full truncate-2-lines text-xs italic top-0"
                        on:click={() => startEditing("lore")}
                    >
                        {projectCard.lore}
                    </button>
                {/if}
            </div>

            <div class="h-[18mm] relative mt-2">
                <div
                    class="absolute left top-0 transform -translate-y-2 text-xs flex items-center font-bold"
                >
                    Effet
                </div>
                {#if $editingField === "effect"}
                    <textarea
                        bind:value={projectCard.effect}
                        class="p-0 pt-2 edited border-none text-[12px] leading-tight focus:outline-none text-justify"
                        on:blur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="p-0 pt-2 h-full overflow-hidden text-[12px] leading-tight effect_area align-text-top text-justify preview"
                        on:click={() => startEditing("effect")}
                    >
                        {@html marked(projectCard.effect)}
                    </div>
                {/if}
            </div>

            <div class="h-[15mm] relative mt-2">
                <div
                    class="absolute left top-0 transform -translate-y-2 text-xs flex items-center font-bold"
                >
                    Combo client effect (
                    {#if $editingField === "comboClientThreshold"}
                        <input
                            type="number"
                            bind:value={projectCard.comboClientThreshold}
                            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                            on:blur={stopEditing}
                        />
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="text-[12px] leading-tight"
                            on:click={() =>
                                startEditing("comboClientThreshold")}
                        >
                            {projectCard.comboClientThreshold}
                        </div>
                    {/if}
                    )
                </div>

                {#if $editingField === "comboClientEffect"}
                    <textarea
                        bind:value={projectCard.comboClientEffect}
                        class="p-0 pt-2 edited border-none text-[12px] leading-tight focus:outline-none text-justify"
                        on:blur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="p-0 pt-2 h-full overflow-hidden text-[12px] leading-tight effect_area align-text-top text-justify preview"
                        on:click={() => startEditing("comboClientEffect")}
                    >
                        {@html marked(projectCard.comboClientEffect)}
                    </div>
                {/if}
            </div>
            <div class="h-[10mm] relative mt-2">
                <div
                    class="absolute left top-0 transform -translate-y-2 text-xs flex items-center font-bold"
                >
                    Penalty effect (
                    {#if $editingField === "penaltyThreshold"}
                        <input
                            type="number"
                            bind:value={projectCard.penaltyThreshold}
                            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                            on:blur={stopEditing}
                        />
                    {:else}
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="text-[12px] leading-tight"
                            on:click={() => startEditing("penaltyThreshold")}
                        >
                            {projectCard.penaltyThreshold}
                        </div>
                    {/if}
                    )
                </div>

                {#if $editingField === "penaltyEffect"}
                    <textarea
                        bind:value={projectCard.penaltyEffect}
                        class="p-0 pt-2 edited border-none text-[12px] leading-tight focus:outline-none text-justify"
                        on:blur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="p-0 pt-2 h-full overflow-hidden text-[12px] leading-tight effect_area align-text-top text-justify preview"
                        on:click={() => startEditing("penaltyEffect")}
                    >
                        {@html marked(projectCard.penaltyEffect)}
                    </div>
                {/if}
            </div>
        </div>

        <!-- Right part with illustration / number data -->
        <div class="relative w-[21mm]">
            <img
                src={projectCard.illustration}
                alt="Project Illustration"
                class="h-[20mm] rounded-full"
            />
            <div class="leading-tight text-center">
                <select
                    name="clients"
                    class="compact-select"
                    on:change={handleSelectChange}
                >
                    {#each clients as client, index}
                        <option
                            value={client.id}
                            selected={projectCard.client === client.id}
                            >{client.name}</option
                        >
                    {/each}
                </select>
            </div>
            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div
                class="relative h-[7mm] flex items-center space-x-1 text-[12px] leading-tight"
            >
                <DollarOutline />
                {#if $editingField === "baseRevenue"}
                    <input
                        type="number"
                        bind:value={projectCard.baseRevenue}
                        class="edited w-full border-none p-0 text-[12px] leading-tight focus:outline-none"
                        on:blur={stopEditing}
                    />
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div on:click={() => startEditing("baseRevenue")}>
                        {projectCard.baseRevenue}
                    </div>
                {/if}k
            </div>
            <div
                class="relative h-[7mm] flex items-center space-x-1 text-[12px] leading-tight"
            >
                <BitcoinSolid />
                {#if $editingField === "optimalRevenue"}
                    <input
                        type="number"
                        bind:value={projectCard.optimalRevenue}
                        class="edited w-full border-none p-0 text-[12px] leading-tight focus:outline-none"
                        on:blur={stopEditing}
                    />
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div on:click={() => startEditing("optimalRevenue")}>
                        {projectCard.optimalRevenue}
                    </div>
                {/if}k
            </div>
            <div
                class="relative h-[7mm] flex items-center space-x-1 text-[12px] leading-tight"
            >
                <AwardSolid />
                {#if $editingField === "reputation"}
                    <input
                        type="number"
                        bind:value={projectCard.reputation}
                        class="edited w-full border-none p-0 text-[12px] leading-tight focus:outline-none"
                        on:blur={stopEditing}
                    />
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div on:click={() => startEditing("reputation")}>
                        {projectCard.reputation}
                    </div>
                {/if}
            </div>

            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <div class="flex flex-wrap pt-1">
                {#each projectCard.optimalStaffing as staffing}
                    <div class="m-[1px]">
                        <Grade bind:grade={staffing} />
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
