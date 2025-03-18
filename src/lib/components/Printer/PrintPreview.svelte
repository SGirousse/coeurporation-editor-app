<script lang="ts">
    import PagePreview from "./PagePreview.svelte";

    let {
        cards,
        isPortrait = true,
        displayBackground = false,
        numberOfPages = $bindable(0),
    } = $props();

    const PORTRAIT_CARDS_PER_ROW = 3;
    const PORTRAIT_CARDS_PER_COL = 3;
    const LANDSCAPE_CARDS_PER_ROW = 1;
    const LANDSCAPE_CARDS_PER_COL = 4;

    const cardsPerRow = isPortrait
        ? PORTRAIT_CARDS_PER_ROW
        : LANDSCAPE_CARDS_PER_ROW;
    const cardsPerCol = isPortrait
        ? PORTRAIT_CARDS_PER_COL
        : LANDSCAPE_CARDS_PER_COL;
    const cardsPerPage = cardsPerRow * cardsPerCol;

    numberOfPages = Math.ceil(cards.length / cardsPerPage);
</script>

{#each { length: numberOfPages }, pageNb}
    <div class="flex flex-wrap justify-center space-y-2 space-x-2">
        <PagePreview
            cardsToDisplay={cards}
            numberOfCardsPerCol={cardsPerCol}
            numberOfCardsPerRow={cardsPerRow}
            numberOfCardsPerPage={cardsPerPage}
            {pageNb}
            showBackground={false}
            {isPortrait}
        />
        {#if displayBackground}
            <PagePreview
                cardsToDisplay={cards}
                numberOfCardsPerCol={cardsPerCol}
                numberOfCardsPerRow={cardsPerRow}
                numberOfCardsPerPage={cardsPerPage}
                {pageNb}
                showBackground={true}
                {isPortrait}
            />
        {/if}
    </div>
    <br />
{/each}
