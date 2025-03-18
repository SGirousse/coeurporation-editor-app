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
    class="page2print grid grid-cols-{numberOfCardsPerRow} grid-rows-{numberOfCardsPerCol} h-[297mm] w-[210mm] p-2 bg-white items-center justify-center"
>
    {#each { length: numberOfCardsPerPage }, cardNb}
        {#if cardsToDisplay.length > pageNb + cardNb + pageNb * numberOfCardsPerPage}
            <div class="flex items-center justify-center h-full w-full">
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
            </div>
        {/if}
    {/each}
</div>
