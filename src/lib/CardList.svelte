<script lang="ts">
  import ResourceCard from "$lib/Cards/ResourceCard.svelte";
  import CodirEventCard from "./Cards/CodirEventCard.svelte";
  import type { CardType } from "$lib/index.ts";

  let { resourceCards = $bindable() } = $props();

  function updateCard(index: number, updatedCard: CardType) {
    resourceCards[index] = updatedCard;
    resourceCards = [...resourceCards];
  }
</script>

<div class="flex flex-col space-y-4">
  <h1>Cartes Ressources</h1>
  <div class="flex flex-wrap">
    {#each resourceCards as resourceCard, index}
      <div class="p-2">
        <ResourceCard
          {resourceCard}
          updateCard={(event: any) => updateCard(index, event.detail)}
        />
      </div>
    {/each}
  </div>

  <h1>Cartes EVENT CODIR</h1>
  <div class="flex flex-wrap">
    {#each resourceCards as resourceCard, index}
      <div class="p-2">
        <CodirEventCard
          {resourceCard}
          updateCard={(event: any) => updateCard(index, event.detail)}
        />
      </div>
    {/each}
  </div>
</div>
