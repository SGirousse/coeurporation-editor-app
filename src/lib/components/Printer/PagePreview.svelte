<script lang="ts">
    import Card from "../Cards/Card.svelte";
    import ProjectCard from "../Cards/ProjectCard.svelte";

    let {
        cardsToDisplay,
        isPortrait = true,
        pageNb,
        numberOfCardsPerPage = 1,
        numberOfCardsPerRow,
        numberOfCardsPerCol,
        showBackground = false,
    } = $props();
</script>

<div
    class="page2print flex flex-wrap h-[297mm] w-[210mm] bg-white items-center justify-center space-x-2"
>
    {#each { length: numberOfCardsPerPage }, cardNb}
        <div
            class="flex items-center justify-center {numberOfCardsPerCol == 1
                ? 'h-full'
                : 'h-1/' + numberOfCardsPerCol} {numberOfCardsPerRow == 1
                ? 'w-full'
                : 'w-1/' + numberOfCardsPerRow}"
        >
            {#if cardsToDisplay.length > pageNb + cardNb + pageNb * numberOfCardsPerPage}
                {#if isPortrait}
                    <Card
                        card={cardsToDisplay[
                            pageNb + cardNb + pageNb * numberOfCardsPerPage
                        ]}
                        isEditable={false}
                        {showBackground}
                    />
                {:else}
                    <ProjectCard
                        card={cardsToDisplay[
                            pageNb + cardNb + pageNb * numberOfCardsPerPage
                        ]}
                        isEditable={false}
                        {showBackground}
                    />
                {/if}
            {/if}
        </div>
    {/each}
</div>
