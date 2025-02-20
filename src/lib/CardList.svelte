<script lang="ts">
  import ResourceCard from '$lib/Cards/ResourceCard.svelte';

  export let resourceCards:ResourceCard[] = [];

  function updateCard(index:number, updatedCard:ResourceCard
  ) {
    resourceCards[index] = updatedCard;
    resourceCards = [...resourceCards];
  }
</script>

<div class="flex flex-wrap ">
  {#each resourceCards as resourceCard, index}
  <div class="p-2">
    <ResourceCard {resourceCard} on:updateCard={(event) => updateCard(index, event.detail)} />
    </div>
  {/each}
</div>