<script>
  import ResourceCard from '$lib/Cards/ResourceCard.svelte';

  export let resourceCards = [];

  function updateCard(index, updatedCard) {
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