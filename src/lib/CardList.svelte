<script lang="ts">
  import ResourceCard from "$lib/Cards/ResourceCard.svelte";
  import CodirEventCard from "./Cards/CodirEventCard.svelte";
  import ActionCard from "./Cards/ActionCard.svelte";
  import ProjectCard from "./Cards/ProjectCard.svelte";
  import type {
    CardType,
    ResourceCardType,
    CodirEventCardType,
    ActionCardType,
    ProjectCardType,
  } from "$lib/index.ts";
  import { Accordion, AccordionItem, Button } from "flowbite-svelte";

  let {
    resourceCards = $bindable([]),
    codirEventCards = $bindable([]),
    actionCards = $bindable([]),
    projectCards = $bindable([]),
  } = $props();

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
      effect: "Effect",
      burnoutPoints: 3,
      cost: 30,
    };
    resourceCards = [...resourceCards, newCard];
  }

  function addNewCodiEventCard() {
    const newCard: CodirEventCardType = {
      title: "Title",
      illustration: "",
      lore: "Lore",
      effect: "Effect",
    };
    codirEventCards = [...codirEventCards, newCard];
  }

  function addNewActionCard() {
    const newCard: ActionCardType = {
      title: "Title",
      illustration: "",
      lore: "Lore",
      effect: "Effect",
    };
    actionCards = [...actionCards, newCard];
  }

  function addNewProjectCard() {
    const newCard: ProjectCardType = {
      title: "Title",
      illustration: "",
      lore: "Lore",
      effect: "Effect",
      client: "Client",
      optimalRevenue: 15,
      baseRevenue: 10,
      comboClientThreshold: 3,
      comboClientEffect: "Combo Effect",
      optimalStaffing: ["A", "B", "C"],
      penaltyThreshold: 1,
      penaltyEffect: "Penalty Effect",
    };
    projectCards = [...projectCards, newCard];
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

  <AccordionItem open>
    <span slot="header">Cartes Actions</span>
    <div class="flex flex-wrap">
      {#each actionCards as actionCard, index}
        <div class="p-2">
          <ActionCard
            {actionCard}
            updateCard={(event: any) => updateCard(index, event.detail)}
          />
        </div>
      {/each}
      <div class="p-2">
        <Button class="w-full h-full" on:click={addNewActionCard}>New</Button>
      </div>
    </div>
  </AccordionItem>

  <AccordionItem open>
    <span slot="header">Cartes Projets</span>
    <div class="flex flex-wrap">
      {#each projectCards as projectCard, index}
        <div class="p-2">
          <ProjectCard
            {projectCard}
            updateCard={(event: any) => updateCard(index, event.detail)}
          />
        </div>
      {/each}
      <div class="p-2">
        <Button class="w-full h-full" on:click={addNewProjectCard}>New</Button>
      </div>
    </div>
  </AccordionItem>
</Accordion>
