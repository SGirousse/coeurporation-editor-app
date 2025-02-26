<script lang="ts">
    import { writable } from "svelte/store";
    import { TrashBinOutline } from "flowbite-svelte-icons";

    import type { ProjectCardType } from "$lib/index.ts";

    export let projectCard: ProjectCardType;
    export let onDeleteAccessor;
    let isEditing = writable(false);

    function saveCard() {
        isEditing.set(false);
    }

    function deleteCard() {
        onDeleteAccessor.deleteProjectCard(projectCard);
    }

    function handleImageChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    projectCard.illustration = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function handleLogoChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    projectCard.logo = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
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
        <div class="flex flex-col w-[55mm] m-0">
            <div
                class="flex h-[8mm]
        "
            >
                {#if $editingField === "title"}
                    <input
                        type="text"
                        bind:value={projectCard.title}
                        class="border-none p-0 text-lg font-bold focus:outline-none"
                        on:blur={stopEditing}
                        on:keydown={(e) => e.key === "Enter" && stopEditing()}
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

            <div
                class="flex h-full
        "
            >
                {#if $editingField === "lore"}
                    <textarea
                        bind:value={projectCard.lore}
                        class="border-none p-0 text-xs leading-tight italic focus:outline-none resize-none w-full h-full"
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
        <div class="relative w-[25mm]">
            <img
                src={projectCard.logo}
                alt="Project Logo"
                class="h-full w-full object-cover"
            />
            <input
                type="file"
                accept="image/*"
                on:change={handleLogoChange}
                class="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
            />
        </div>
    </div>

    <div class="flex flex-col space-y-2 mt-4">
        <div class="h-[20mm]">
            {#if $editingField === "effect"}
                <textarea
                    bind:value={projectCard.effect}
                    class="border-none p-0 text-sm leading-tight focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                ></textarea>
            {:else}
                <div
                    class="overflow-hidden text-sm leading-tight text-ellipsis"
                    on:click={() => startEditing("effect")}
                >
                    {projectCard.effect}
                </div>
            {/if}
        </div>
        {#if $editingField === "client"}
            <input
                type="text"
                bind:value={projectCard.client}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            />
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("client")}
            >
                Client: {projectCard.client}
            </div>
        {/if}

        {#if $editingField === "optimalRevenue"}
            <input
                type="number"
                bind:value={projectCard.optimalRevenue}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            />
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("optimalRevenue")}
            >
                Optimal Revenue: {projectCard.optimalRevenue}k
            </div>
        {/if}

        {#if $editingField === "baseRevenue"}
            <input
                type="number"
                bind:value={projectCard.baseRevenue}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            />
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("baseRevenue")}
            >
                Base Revenue: {projectCard.baseRevenue}k
            </div>
        {/if}

        {#if $editingField === "comboClientThreshold"}
            <input
                type="number"
                bind:value={projectCard.comboClientThreshold}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            />
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("comboClientThreshold")}
            >
                Combo Client Threshold: {projectCard.comboClientThreshold}
            </div>
        {/if}

        {#if $editingField === "comboClientEffect"}
            <textarea
                bind:value={projectCard.comboClientEffect}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            ></textarea>
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("comboClientEffect")}
            >
                Combo Client Effect: {projectCard.comboClientEffect}
            </div>
        {/if}

        {#if $editingField === "optimalStaffing"}
            <input
                type="text"
                bind:value={projectCard.optimalStaffing}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            />
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("optimalStaffing")}
            >
                Optimal Staffing: {projectCard.optimalStaffing.join(", ")}
            </div>
        {/if}

        {#if $editingField === "penaltyThreshold"}
            <input
                type="number"
                bind:value={projectCard.penaltyThreshold}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            />
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("penaltyThreshold")}
            >
                Penalty Threshold: {projectCard.penaltyThreshold}
            </div>
        {/if}

        {#if $editingField === "penaltyEffect"}
            <textarea
                bind:value={projectCard.penaltyEffect}
                class="border-none p-0 text-sm leading-tight focus:outline-none"
                on:blur={stopEditing}
                on:keydown={(e) => e.key === "Enter" && stopEditing()}
            ></textarea>
        {:else}
            <div
                class="text-sm leading-tight"
                on:click={() => startEditing("penaltyEffect")}
            >
                Penalty Effect: {projectCard.penaltyEffect}
            </div>
        {/if}
    </div>
</div>

<style>
    .project-card {
        background-color: white;
        color: black;
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
</style>
