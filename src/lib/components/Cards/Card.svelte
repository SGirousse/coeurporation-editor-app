<script lang="ts">
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import Grade from "./Fields/Grade.svelte";
    import ImageSelector from "$lib/components/Helper/ImageSelector.svelte";
    import ShareButton from "../Helper/ShareButton.svelte";
    import EditableNumber from "./Fields/EditableNumber.svelte";
    import EditableMarkdown from "./Fields/EditableMarkdown.svelte";
    import { currentCardTheme } from "./CardTheme.svelte";
    import { cardTypeIcons } from "./CardType.svelte";
    import GameIcon from "../Helper/GameIcon.svelte";
    import { ICON_BATTERY } from "../Helper/IconManager.svelte";

    let {
        card = $bindable(),
        onDeleteAccessor = undefined,
        isEditable = true,
        showBackground = false,
    } = $props();

    function deleteCard() {
        onDeleteAccessor.deleteCard(card);
    }
</script>

<div
    id={`card-${card.id}`}
    class="group relative flex h-[88.9mm] w-[63.5mm] flex-col rounded-lg"
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

            <div class="flex flex-col">
                <!-- Top of the card (cost, title)-->
                <div
                    class="flex flex-nowrap h-[9.5mm] items-center space-x-1 rounded-t-lg w-full"
                    style="background: linear-gradient(90deg, {currentCardTheme
                        .value.accentuationColor} 10%, {currentCardTheme.value
                        .mainColor} 100%);"
                >
                    <div
                        class="flex items-center justify-center w-1/10 h-full bg-white truncate p-0 m-0 rounded-tl-lg"
                        style="background: {currentCardTheme.value
                            .accentuationColor}; color: {currentCardTheme.value
                            .ligthTextColor};"
                    >
                        <GameIcon name={cardTypeIcons[card.cardType]} />
                    </div>
                    <div
                        class="items-center w-8/10 h-full pl-1 pr-1"
                        style="background: {currentCardTheme.value
                            .mainColor}; border-color: {currentCardTheme.value
                            .mainColor};  color: {currentCardTheme.value
                            .ligthTextColor};"
                    >
                        <EditableMarkdown
                            {card}
                            bind:markdownText={card.title}
                            additionalClass={"font-bold text-left truncate text-[14px] flex items-center"}
                        />
                    </div>
                    {#if "cost" in card}
                        <div
                            class="flex items-center justify-center w-1/10 h-full text-black font-bold text-[14px] bg-gradient-to-r from-amber-200 to-yellow-500 truncate p-0 m-0 rounded-tr-lg"
                        >
                            <EditableNumber
                                bind:value={card.cost}
                                {isEditable}
                            />
                        </div>
                    {/if}
                </div>

                <!-- Illustration and values (burnout, grade, ...)-->
                <div class="h-[33mm]">
                    <ImageSelector
                        bind:illustration={card.illustration}
                        {isEditable}
                    />
                </div>

                <div
                    class="h-[7mm] pl-1 pr-1"
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
                    class="flex flex-nowrap items-center justify-end h-[8.5mm] space-x-2 pt-1 pb-1 pr-2 pl-2 rounded-b-lg"
                    style="background: linear-gradient(90deg, {currentCardTheme
                        .value.accentuationColor} 10%, {currentCardTheme.value
                        .mainColor} 100%);"
                >
                    {#if "burnoutPoints" in card}
                        <div
                            class="flex justify-center items-center rounded-full border min-h-[7mm] max-h-[7mm] min-w-[7mm] max-w-[7mm] text-[12px] font-bold"
                            style="background: {currentCardTheme.value
                                .accentuationColor}; border-color: {currentCardTheme
                                .value
                                .accentuationColor}; color: {currentCardTheme
                                .value.ligthTextColor};"
                        >
                            <GameIcon name={ICON_BATTERY} />
                            <EditableNumber
                                bind:value={card.burnoutPoints}
                                {isEditable}
                            />
                        </div>
                    {/if}
                    {#if "grade" in card}
                        <Grade
                            bind:grade={card.grade as string}
                            bind:cost={card.cost}
                            {isEditable}
                        />
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>
