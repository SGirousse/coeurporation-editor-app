<script>
    import { page } from "$app/state";
    import Card from "$lib/components/Cards/Card.svelte";
    import defaultIllustration from "$lib/assets/illustration/default.jpg";
    import { Spinner } from "flowbite-svelte";
    import ProjectCard from "$lib/components/Cards/ProjectCard.svelte";

    async function getCardFromQueryParams() {
        const cardAsJson = page.url.searchParams.get("card");
        if (cardAsJson) {
            let card;
            card = JSON.parse(cardAsJson);
            card.illustration = defaultIllustration;
            return card;
        } else {
            throw new Error(
                "Impossible de parser l'URL contenant les données de la carte",
            );
        }
    }
</script>

<div class="h-full flex items-center justify-center">
    {#await getCardFromQueryParams()}
        <Spinner />...Loading
    {:then card}
        {#if card.cardType == "ProjectCardType"}
            <ProjectCard {card} isEditable={false} />
        {:else}
            <Card {card} isEditable={false} />
        {/if}
    {:catch error}
        <div class="text-black dark:text-white">
            {error}
        </div>
    {/await}
</div>
