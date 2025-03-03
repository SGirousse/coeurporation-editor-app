<script lang="ts">
    import { writable } from "svelte/store";
    import {
        TrashBinOutline,
        BatteryOutline,
        DollarOutline,
    } from "flowbite-svelte-icons";
    import { marked } from "marked";
    import type { CardType } from "$lib/index.ts";
    import defaultIllustration from "$lib/assets/illustration/default.jpg";

    export let card: CardType;
    export let onDeleteAccessor: any;
    let editingField = writable<string | null>(null);
    let gradeColor = "";
    if ("grade" in card) {
        updateGradeValue(card.grade as string);
    }
    if (card.illustration === undefined || card.illustration === "") {
        card.illustration = defaultIllustration;
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

    async function handleSelectChange(event: any) {
        updateGradeValue(event.target.value);
    }

    async function updateGradeValue(grade: string) {
        if (grade && "grade" in card) {
            card.grade = grade;
            switch (card.grade) {
                case "A":
                    gradeColor = "bg-green-500";
                    break;
                case "B":
                    gradeColor = "bg-blue-500";
                    break;
                case "C":
                    gradeColor = "bg-yellow-500";
                    break;
                case "D":
                    gradeColor = "bg-orange-500";
                    break;
                case "E":
                    gradeColor = "bg-purple-500";
                    break;
                case "S":
                    gradeColor = "bg-amber-500";
                    break;
                case "Stg":
                    gradeColor = "bg-teal-500";
                    break;
                default:
                    gradeColor = "bg-gray-500";
            }
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
    class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg border p-1 shadow-lg standard-card"
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
        <div class="flex flex-col">
            {#if $editingField === "title"}
                <input
                    type="text"
                    bind:value={card.title}
                    class="edited border-none p-0 text-lg font-bold focus:outline-none"
                    on:blur={stopEditing}
                    on:keydown={(e) => e.key === "Enter" && stopEditing()}
                />
            {:else}
                <button
                    class="h-[8mm] truncate text-lg font-bold"
                    on:click={() => startEditing("title")}
                >
                    {card.title}
                </button>
            {/if}

            <div class="relative h-[34mm] mb-1">
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
                {#if "grade" in card}
                    <select
                        name="grade"
                        class="compact-select text-[12px] absolute -top-3 -right-1 {gradeColor} flex h-8 w-8 items-center justify-center rounded-full text-white text-center focus:outline-none"
                        on:change={handleSelectChange}
                    >
                        <option value="Stg" selected={card.grade === "Stg"}
                            >Stg</option
                        >
                        <option value="A" selected={card.grade === "A"}
                            >A</option
                        >
                        <option value="B" selected={card.grade === "B"}
                            >B</option
                        >
                        <option value="C" selected={card.grade === "C"}
                            >C</option
                        >
                        <option value="D" selected={card.grade === "D"}
                            >D</option
                        >
                        <option value="E" selected={card.grade === "E"}
                            >E</option
                        >
                        <option value="S" selected={card.grade === "S"}
                            >S</option
                        >
                    </select>
                {/if}
            </div>

            <div class="relative h-[9mm]">
                {#if $editingField === "lore"}
                    <textarea
                        rows="2"
                        bind:value={card.lore}
                        class="edited border-none p-0 text-[9px] leading-tight italic focus:outline-none text-justify"
                        on:blur={stopEditing}
                        on:keydown={(e) => e.key === "Enter" && stopEditing()}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="truncate-2-lines text-[9px] italic text-justify"
                        on:click={() => startEditing("lore")}
                    >
                        {card.lore}
                    </div>
                {/if}
            </div>

            <div class="relative h-[24mm]">
                {#if $editingField === "effect"}
                    <textarea
                        bind:value={card.effect}
                        class="edited border-none p-0 text-[12px] leading-tight focus:outline-none text-justify"
                        on:blur={stopEditing}
                    ></textarea>
                {:else}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="h-full overflow-hidden text-[12px] leading-tight effect_area align-text-top text-justify preview"
                        on:click={() => startEditing("effect")}
                    >
                        {@html marked(card.effect)}
                    </div>
                {/if}
            </div>

            <div class="flex h-[9mm] items-center justify-between">
                {#if "burnoutPoints" in card}
                    <div class="flex items-center w-[15mm]">
                        <BatteryOutline />
                        {#if $editingField === "burnoutPoints"}
                            <input
                                type="number"
                                bind:value={card.burnoutPoints}
                                class="text-[12px] edited border-none p-0 leading-tight focus:outline-none"
                                placeholder="e.g. 3"
                                on:blur={stopEditing}
                                on:keydown={(e) =>
                                    e.key === "Enter" && stopEditing()}
                            />
                        {:else}
                            <button
                                class="text-[12px] truncate-2-lines pl-1"
                                on:click={() => startEditing("burnoutPoints")}
                                >{#if card.burnoutPoints}{card.burnoutPoints}{:else}0{/if}</button
                            >
                        {/if}
                    </div>
                {/if}
                {#if "cost" in card}
                    <div class="flex items-center w-[15mm]">
                        <DollarOutline />
                        {#if $editingField === "cost"}
                            <input
                                type="number"
                                bind:value={card.cost}
                                class="text-[12px] edited border-none p-0 leading-tight focus:outline-none"
                                placeholder="e.g. 20"
                                on:blur={stopEditing}
                                on:keydown={(e) =>
                                    e.key === "Enter" && stopEditing()}
                            />
                        {:else}
                            <button
                                class="text-[12px] truncate-2-lines pl-1"
                                on:click={() => startEditing("cost")}
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

    .standard-card .edited {
        background-color: rgb(197, 197, 197);
    }

    .standard-card button {
        text-align: left;
        width: 100%;
        height: 100%;
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

    .compact-select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: none;
        padding: 0;
        cursor: pointer;
        background-image: none;
    }

    .compact-select option {
        background: white;
        color: black;
    }
</style>
