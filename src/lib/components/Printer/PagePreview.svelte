<script lang="ts">
    import Card from "../Cards/Card.svelte";
    import ProjectCard from "../Cards/ProjectCard.svelte";

    let {
        cardsToDisplay,
        isPortrait = true,
        pageNb,
        numberOfCardsPerPage = 1,
        numberOfCardsPerRow = 3, // Default to 3 for a 9x9 grid
        numberOfCardsPerCol = 3, // Default to 3 for a 9x9 grid
        showBackground = false,
    } = $props();

    // Calculate the width and height of each grid cell
    const cellWidth = 100 / numberOfCardsPerRow + "%";
    const cellHeight = 100 / numberOfCardsPerCol + "%";
</script>

<div
    class="page2print flex flex-wrap h-[297mm] w-[210mm] bg-white items-center justify-center"
>
    {#each { length: numberOfCardsPerPage }, cardNb}
        <div
            class="flex items-center justify-center"
            style="width: {cellWidth}; height: {cellHeight};"
        >
            {#if cardsToDisplay.length > pageNb * numberOfCardsPerPage + cardNb}
                {#if isPortrait}
                    <Card
                        card={cardsToDisplay[
                            pageNb * numberOfCardsPerPage + cardNb
                        ]}
                        isEditable={false}
                        {showBackground}
                    />
                {:else}
                    <ProjectCard
                        card={cardsToDisplay[
                            pageNb * numberOfCardsPerPage + cardNb
                        ]}
                        isEditable={false}
                        {showBackground}
                    />
                {/if}
            {:else}
                <!-- Placeholder for empty cells -->
                <div class="h-full w-full bg-gray-200"></div>
            {/if}
        </div>
    {/each}
</div>
