<script lang="ts">
    import {
        resourceCards,
        codirEventCards,
        actionCards,
        projectCards,
    } from "$lib/components/Cards/ResourceCard.svelte";
    import PrintPreview from "$lib/components/Printer/PrintPreview.svelte";
    import { cards2pdf } from "$lib/utils/cardsExport2Print";
    import { Button, Spinner } from "flowbite-svelte";
    import {
        AtomOutline,
        BugSolid,
        CartPlusAltSolid,
        ChartMixedDollarSolid,
        ImageOutline,
        PrinterOutline,
    } from "flowbite-svelte-icons";

    let displayBackground = $state(false);
    let numberOfResourceCardsPages = $state(0);
    let numberOfCodirEventCardsPages = $state(0);
    let numberOfActionCardsPages = $state(0);
    let numberOfProjectCardsPages = $state(0);

    let cardsNumber = $derived(
        numberOfResourceCardsPages +
            numberOfCodirEventCardsPages +
            numberOfActionCardsPages +
            numberOfProjectCardsPages,
    );

    let isPrintInProgress = $state(false);
    async function printPages() {
        isPrintInProgress = true;
        await cards2pdf();
        isPrintInProgress = false;
    }
</script>

<div class="sticky top-16 z-10 bg-auto bg-white dark:bg-gray-800">
    <div class="flex flex-nowrap items-center text-black dark:text-white p-1">
        <div class="flex flex-wrap w-full justify-start space-x-2">
            <div class="flex flex-nowrap">
                <CartPlusAltSolid /> : {numberOfResourceCardsPages}
            </div>
            <div class="flex flex-nowrap">
                <ChartMixedDollarSolid /> : {numberOfCodirEventCardsPages}
            </div>
            <div class="flex flex-nowrap">
                <BugSolid /> : {numberOfActionCardsPages}
            </div>
            <div class="flex flex-nowrap">
                <AtomOutline /> : {numberOfProjectCardsPages}
            </div>
        </div>
        <div class="flex flex-nowrap justify-end space-x-2">
            <Button
                onclick={printPages}
                disabled={isPrintInProgress || cardsNumber < 1}
                >{#if isPrintInProgress}<Spinner
                        size="4"
                        color="white"
                    />{:else}<PrinterOutline />{/if}</Button
            >
            <Button
                class="h-fit"
                onclick={() => (displayBackground = !displayBackground)}
                ><ImageOutline /></Button
            >
        </div>
    </div>
</div>
<div class="flex flex-wrap justify-center space-y-2 space-x-2">
    <PrintPreview
        cards={resourceCards.cards}
        {displayBackground}
        bind:numberOfPages={numberOfResourceCardsPages}
    />
    <PrintPreview
        cards={codirEventCards.cards}
        {displayBackground}
        bind:numberOfPages={numberOfCodirEventCardsPages}
    />
    <PrintPreview
        cards={actionCards.cards}
        {displayBackground}
        bind:numberOfPages={numberOfActionCardsPages}
    />
    <PrintPreview
        cards={projectCards.cards}
        isPortrait={false}
        {displayBackground}
        bind:numberOfPages={numberOfProjectCardsPages}
    />
</div>
