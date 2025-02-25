<script lang="ts">
  import Card from "./Cards/Card.svelte";
  import ProjectCard from "./Cards/ProjectCard.svelte";
  import {
    type CardType,
    ResourceCardType,
    CodirEventCardType,
    ActionCardType,
    ProjectCardType,
  } from "$lib/index.js";
  import { Accordion, AccordionItem, Button } from "flowbite-svelte";

  let {
    resourceCards = $bindable([]),
    codirEventCards = $bindable([]),
    actionCards = $bindable([]),
    projectCards = $bindable([]),
  } = $props();

  function deleteCard(cardToDelete: CardType) {
    switch (cardToDelete.cardType) {
      case "ResourceCardType":
        resourceCards = resourceCards.filter((card) => card !== cardToDelete);

        break;

      case "CodirEventCardType":
        codirEventCards = codirEventCards.filter(
          (card) => card !== cardToDelete,
        );

        break;

      case "ActionCardType":
        actionCards = actionCards.filter((card) => card !== cardToDelete);

        break;

      case "ProjectCardType":
        projectCards = projectCards.filter((card) => card !== cardToDelete);

        break;

      default:
        throw new Error("Unsupported card type");
    }
  }

  function deleteProjectCard(cardToDelete: ProjectCardType) {
    projectCards = projectCards.filter((card) => card !== cardToDelete);
  }

  let onDeleteAccessor = {
    deleteCard,
    deleteProjectCard,
  };

  function addNewResourceCard() {
    const newCard = new ResourceCardType(
      "Title",
      "",
      "Lore",
      "Effect",
      "A",
      3,
      30,
    );
    resourceCards = [...resourceCards, newCard];
  }

  function addNewCodiEventCard() {
    const newCard = new CodirEventCardType("Title", "", "Lore", "Effect");
    codirEventCards = [...codirEventCards, newCard];
  }

  function addNewActionCard() {
    const newCard = new ActionCardType("Title", "", "Lore", "Effect");
    actionCards = [...actionCards, newCard];
  }

  function addNewProjectCard() {
    const newCard = new ProjectCardType(
      "Title",
      "",
      "Lore",
      "Effect",
      "Client",
      15,
      10,
      3,
      "Combo Effect",
      ["A", "B", "C"],
      1,
      "Penalty Effect",
    );
    projectCards = [...projectCards, newCard];
  }
</script>

<Accordion class="w-full h-full" multiple>
  <AccordionItem class="w-full h-full" open>
    <span slot="header">Cartes Ressources</span>
    <div class="flex flex-wrap">
      {#each resourceCards as resourceCard, index}
        <div class="p-2">
          <Card card={resourceCard} {onDeleteAccessor} />
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
          <Card card={codirEventCard} {onDeleteAccessor} />
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
          <Card card={actionCard} {onDeleteAccessor} />
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
          <ProjectCard {projectCard} {onDeleteAccessor} />
        </div>
      {/each}
      <div class="p-2">
        <Button class="w-full h-full" on:click={addNewProjectCard}>New</Button>
      </div>
    </div>
  </AccordionItem>
</Accordion>
