<script lang="ts">
    import { writable } from "svelte/store";
    import { TrashBinOutline } from "flowbite-svelte-icons";

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

    function deleteCard() {
        onDeleteAccessor.deleteProjectCard(projectCard);
    }

    function handleSelectChange(event: any) {
        const selectedClientId = event.target.value;
        const selectedClient = clients.find(
            (client) => client.id === selectedClientId,
        );

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
    class="group relative flex h-[120mm] w-[70mm] flex-col rounded-lg border p-4 shadow-lg project-card"
>
    <div class="absolute top-2 right-2 flex space-x-2 z-10">
        <button
            on:click={deleteCard}
            class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
        >
            <TrashBinOutline class="text-red-600" />
        </button>
    </div>

    <div
        class="flex h-[20mm]
    "
    >
        <div class="flex flex-col w-[44mm] m-0">
            <div
                class="flex h-[8mm]
        "
            >
                <div class="relative h-[9mm]">
                    {#if $editingField === "title"}
                        <input
                            type="text"
                            bind:value={projectCard.title}
                            class="edited border-none p-0 text-lg font-bold focus:outline-none"
                            on:blur={stopEditing}
                            on:keydown={(e) =>
                                e.key === "Enter" && stopEditing()}
                        />
                    {:else}
                        <button
                            class="truncate text-lg font-bold"
                            on:click={() => startEditing("title")}
                        >
                            {projectCard.title}
                        </button>
                    {/if}
                </div>
            </div>

            <div
                class="relative h-[9mm]
        "
            >
                {#if $editingField === "lore"}
                    <textarea
                        bind:value={projectCard.lore}
                        class="edited border-none p-0 text-xs leading-tight italic focus:outline-none resize-none w-full h-full"
                        on:blur={stopEditing}
                        on:keydown={(e) => e.key === "Enter" && stopEditing()}
                    ></textarea>
                {:else}
                    <button
                        class="truncate-2-lines text-xs italic top-0"
                        on:click={() => startEditing("lore")}
                    >
                        {projectCard.lore}
                    </button>
                {/if}
            </div>
        </div>
        <div class="relative">
            <img
                src={projectCard.illustration}
                alt="Project Illustration"
                class="h-[17mm] w-[17mm]"
            />
        </div>
    </div>

    <div class="flex flex-col space-y-2 mt-4">
        <div class="h-[20mm]">
            {#if $editingField === "effect"}
                <textarea
                    bind:value={projectCard.effect}
                    class="edited border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                ></textarea>
            {:else}
                <div
                    class="overflow-hidden text-[12px] leading-tight text-ellipsis"
                    on:click={() => startEditing("effect")}
                >
                    {projectCard.effect}
                </div>
            {/if}
        </div>
        <div class="h-[7mm] text-[12px] leading-tight">
            Client: <select
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

        <div class="relative h-[7mm]">
            {#if $editingField === "optimalRevenue"}
                <input
                    type="number"
                    bind:value={projectCard.optimalRevenue}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("optimalRevenue")}
                >
                    Optimal Revenue: {projectCard.optimalRevenue}k
                </div>
            {/if}
        </div>

        <div class="relative h-[7mm]">
            {#if $editingField === "baseRevenue"}
                <input
                    type="number"
                    bind:value={projectCard.baseRevenue}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("baseRevenue")}
                >
                    Base Revenue: {projectCard.baseRevenue}k
                </div>
            {/if}
        </div>
        <div class="relative h-[7mm]">
            {#if $editingField === "comboClientThreshold"}
                <input
                    type="number"
                    bind:value={projectCard.comboClientThreshold}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("comboClientThreshold")}
                >
                    Combo Client Threshold: {projectCard.comboClientThreshold}
                </div>
            {/if}
        </div>
        <div class="relative h-[7mm]">
            {#if $editingField === "comboClientEffect"}
                <textarea
                    bind:value={projectCard.comboClientEffect}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                ></textarea>
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("comboClientEffect")}
                >
                    Combo Client Effect: {projectCard.comboClientEffect}
                </div>
            {/if}
        </div>
        <div class="relative h-[7mm]">
            {#if $editingField === "optimalStaffing"}
                <input
                    type="text"
                    bind:value={projectCard.optimalStaffing}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("optimalStaffing")}
                >
                    Optimal Staffing: {projectCard.optimalStaffing.join(", ")}
                </div>
            {/if}
        </div>
        <div class="relative h-[7mm]">
            {#if $editingField === "penaltyThreshold"}
                <input
                    type="number"
                    bind:value={projectCard.penaltyThreshold}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("penaltyThreshold")}
                >
                    Penalty Threshold: {projectCard.penaltyThreshold}
                </div>
            {/if}
        </div>
        <div class="relative h-[7mm]">
            {#if $editingField === "penaltyEffect"}
                <textarea
                    bind:value={projectCard.penaltyEffect}
                    class="border-none p-0 text-[12px] leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                ></textarea>
            {:else}
                <div
                    class="text-[12px] leading-tight"
                    on:click={() => startEditing("penaltyEffect")}
                >
                    Penalty Effect: {projectCard.penaltyEffect}
                </div>
            {/if}
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

    .compact-select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: none;
        border: none;
        padding: 0;
        font-size: inherit;
        font-family: inherit;
        color: inherit;
        cursor: pointer;
    }

    .compact-select option {
        background: white;
        color: black;
    }
</style>
