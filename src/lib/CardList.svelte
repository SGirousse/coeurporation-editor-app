<script lang="ts">
  import ResourceCard from "$lib/Cards/ResourceCard.svelte";
  import CodirEventCard from "./Cards/CodirEventCard.svelte";
  import type {
    CardType,
    ResourceCardType,
    CodirEventCardType,
  } from "$lib/index.ts";
  import { Accordion, AccordionItem, Button } from "flowbite-svelte";

  let { resourceCards = $bindable([]), codirEventCards = $bindable([]) } =
    $props();

  function updateCard(index: number, updatedCard: CardType) {
    resourceCards[index] = updatedCard;
    resourceCards = [...resourceCards];
  }

  function addNewResourceCard() {
    const newCard: ResourceCardType = {
      title: "Title",
      grade: "A",
      illustration: "",
      lore: "Lore",
      effect: "Effet",
      burnoutPoints: 3,
      cost: 30,
    };
    resourceCards = [...resourceCards, newCard];
  }

  function addNewCodiEventCard() {
    const newCard: CodirEventCardType = {
      title: "",
      illustration: "",
      lore: "",
      effect: "",
    };
    codirEventCards = [...codirEventCards, newCard];
  }
</script>

<Accordion class="w-full h-full" multiple>
  <AccordionItem class="w-full h-full" open>
    <span slot="header">Cartes Ressources</span>
    <div class="flex flex-wrap">
      {#each resourceCards as resourceCard, index}
        <div class="p-2">
          <ResourceCard
            {resourceCard}
            updateCard={(event: any) => updateCard(index, event.detail)}
          />
        </div>
      {/each}
      <div class="p-2">
        <Button class="w-full h-full" on:click={addNewResourceCard}>New</Button>
      </div>
    </div>
  </AccordionItem>

  <AccordionItem open>
    <span slot="header">Cartes EVENT CODIR</span>
    <div class="flex flex-wrap">
      {#each codirEventCards as codirEventCard, index}
        <div class="p-2">
          <CodirEventCard
            {codirEventCard}
            updateCard={(event: any) => updateCard(index, event.detail)}
          />
        </div>
      {/each}
      <div class="p-2">
        <Button class="w-full h-full" on:click={addNewCodiEventCard}>New</Button
        >
      </div>
    </div>
  </AccordionItem>
</Accordion>
