<script lang="ts">
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import Grade from "./Fields/Grade.svelte";
    import type { ClientType } from "$lib/components/Clients/ClientType.svelte";
    import { clients } from "$lib/components/GameManager.svelte";
    import ShareButton from "../Helper/ShareButton.svelte";
    import EditableMarkdown from "./Fields/EditableMarkdown.svelte";
    import { currentCardTheme } from "./CardTheme.svelte";
    import EditableNumber from "./Fields/EditableNumber.svelte";
    import { cardTypeIcons } from "./CardType.svelte";
    import GameIcon from "../Helper/GameIcon.svelte";
    import {
        ICON_BASE_REVENUE,
        ICON_AWARD,
        ICON_OPTIMAL_REVENUE,
        ICON_REPUTATION,
    } from "../Helper/IconManager.svelte";

    let {
        card = $bindable(),
        onDeleteAccessor = undefined,
        isEditable = true,
        showBackground = false,
    } = $props();

    function deleteCard() {
        onDeleteAccessor.deleteCard(card);
    }

    async function handleSelectChange(event: any) {
        updateClientValue(event.target.value);
    }

    async function updateClientValue(clientId: string) {
        const selectedClient = clients.clients.find(
            (client: ClientType) => client.id === clientId,
        );

        if (selectedClient) {
            card.client = selectedClient.id;
            card.illustration = selectedClient.illustration;
        } else {
            card.client = clients.clients[0].id;
            card.illustration = clients.clients[0].illustration;
        }
    }

    $effect(() => {
        updateClientValue(card.client);
    });
</script>

<div
    id={`card-${card.id}`}
    class="group relative flex h-[70mm] w-[120mm] flex-col rounded-lg"
    style="border: 0.5px {currentCardTheme.value.outerBorder} solid;"
>
    {#if showBackground}
        <div
            class="h-full rounded-lg flex items-center justify-center"
            style="background: radial-gradient(circle, {currentCardTheme.value
                .mainColor} 10%, {currentCardTheme.value
                .accentuationColor} 100%); color: {currentCardTheme.value
                .ligthTextColor};"
        >
            <GameIcon
                name={cardTypeIcons[card.cardType]}
                width="w-full"
                height="h-full"
            />
        </div>
    {:else}
        <div
            class="rounded-lg game-card"
            style="background: linear-gradient(90deg, {currentCardTheme.value
                .accentuationColor} 10%, {currentCardTheme.value
                .mainColor} 100%); "
        >
            {#if isEditable}
                <div class="absolute bottom-1 left-2 flex space-x-2 z-10">
                    <button
                        onclick={deleteCard}
                        class="rounded bg-gray-200 p-1 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <TrashBinOutline class="text-red-600" />
                    </button>
                    <ShareButton {card} />
                </div>
            {/if}

            <div class="flex-grow flex">
                <!-- Left part with text data -->
                <div class="flex flex-col w-[93mm] m-0">
                    <div
                        class="flex flex-nowrap h-[9.5mm] items-center space-x-1 pl-1 rounded-t-lg"
                    >
                        <div
                            class="ml-1 pl-[7mm] relative h-[6mm] w-full"
                            style="background: {currentCardTheme.value
                                .mainColor}; border-color: {currentCardTheme
                                .value.mainColor};  color: {currentCardTheme
                                .value.ligthTextColor};"
                        >
                            <EditableMarkdown
                                {card}
                                bind:markdownText={card.title}
                                additionalClass={"font-bold"}
                            />
                        </div>
                        <div
                            class="flex items-center justify-center absolute -translate-x-0.5 min-h-[8mm] max-h-[8mm] min-w-[8mm] max-w-[8mm] rounded-full bg-white"
                            style="background: {currentCardTheme.value
                                .accentuationColor}; border-color: {currentCardTheme
                                .value
                                .accentuationColor}; color: {currentCardTheme
                                .value.ligthTextColor};"
                        >
                            <GameIcon name={cardTypeIcons[card.cardType]} />
                        </div>
                    </div>

                    <div
                        class="h-[8mm] pl-1 pr-1 pt-1"
                        style="color: {currentCardTheme.value
                            .darkTextColor}; background-color: white;"
                    >
                        <EditableMarkdown
                            {card}
                            bind:markdownText={card.lore}
                            additionalClass={"text-[9px] italic"}
                        />
                    </div>

                    <div
                        class="relative h-[30.3mm] pl-1 pr-1"
                        style="color: {currentCardTheme.value
                            .darkTextColor}; background-color: white;"
                    >
                        <EditableMarkdown
                            {card}
                            bind:markdownText={card.effect}
                            textAeraTitle="Effet"
                            additionalClass={"text-[12px]"}
                        />
                    </div>
                    <div
                        class="relative h-[21.7mm] pl-1 pr-1 rounded-bl"
                        style="color: {currentCardTheme.value
                            .darkTextColor}; background-color: white;"
                    >
                        <EditableMarkdown
                            {card}
                            bind:markdownText={card.penaltyEffect}
                            textAeraTitle="Effet de pénalité"
                            bind:threshold={card.penaltyThreshold}
                            additionalClass={"text-[12px]"}
                        />
                    </div>
                </div>

                <!-- Right part with illustration / number data -->
                <div class="relative w-[27mm]">
                    <div class="items-center justify-center">
                        <div class="h-[27mm] p-1">
                            <img
                                src={card.illustration}
                                alt="Project Illustration"
                                class=" rounded-full border"
                                style="border-color: {currentCardTheme.value
                                    .mainColor};"
                            />
                        </div>
                        <div
                            class="leading-tight text-center pb-1"
                            style="color: {currentCardTheme.value
                                .ligthTextColor};"
                        >
                            <select
                                name="clients"
                                class="compact-select bg-transparent font-bold"
                                onchange={handleSelectChange}
                            >
                                {#each clients.clients as client, _}
                                    <option
                                        value={client.id}
                                        selected={card.client === client.id}
                                        >{client.name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </div>

                    <hr
                        style="color: {currentCardTheme.value.ligthTextColor};"
                    />

                    <!-- Values section -->
                    <div
                        class="grid grid-cols-2 gap-1 mt-2 mb-2 text-[14px] leading-tight"
                        style="color: {currentCardTheme.value.ligthTextColor};"
                    >
                        <div class="flex items-center justify-center">
                            <GameIcon name={ICON_BASE_REVENUE} />
                            <EditableNumber
                                bind:value={card.baseRevenue}
                                {isEditable}
                            />k
                        </div>
                        <div class="flex items-center justify-center">
                            <GameIcon name={ICON_AWARD} />
                            <EditableNumber
                                bind:value={card.reputation}
                                {isEditable}
                            />
                        </div>
                        <div class="flex items-center justify-center">
                            <GameIcon name={ICON_OPTIMAL_REVENUE} />
                            <EditableNumber
                                bind:value={card.optimalRevenue}
                                {isEditable}
                            />
                            k
                        </div>
                        <div class="flex items-center justify-center">
                            <GameIcon name={ICON_REPUTATION} />
                            <div>
                                {clients.clients.find(
                                    (client: ClientType) =>
                                        client.id === card.client,
                                )?.comboThreshold}
                            </div>
                        </div>
                    </div>

                    <hr
                        style="color: {currentCardTheme.value.ligthTextColor};"
                    />

                    <!-- Staffing section -->
                    <div
                        class="flex flex-wrap p-0 pt-2 items-center justify-center"
                    >
                        {#each card.optimalStaffing as _, index}
                            <div class="p-0.5">
                                <!-- svelte-ignore binding_property_non_reactive -->
                                <Grade
                                    bind:grade={card.optimalStaffing[index]}
                                    {isEditable}
                                />
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
