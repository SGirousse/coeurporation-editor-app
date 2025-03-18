<script lang="ts">
  import Card from "./Card.svelte";
  import { ActionCardType, CodirEventCardType, grades } from "$lib";
  import ProjectCard from "./ProjectCard.svelte";
  import {
    ProjectCardType,
    ResourceCardType,
    type CardType,
  } from "$lib/index.js";
  import {
    Heading,
    Span,
    Secondary,
    Button,
    Input,
    GradientButton,
    Dropdown,
    Checkbox,
  } from "flowbite-svelte";
  import {
    AddColumnAfterOutline,
    FilterOutline,
    SortOutline,
  } from "flowbite-svelte-icons";
  import {
    resourceCards,
    codirEventCards,
    actionCards,
    projectCards,
    clients,
    newCard,
  } from "$lib/components/Cards/ResourceCard.svelte";

  let { type } = $props();

  let title: string = $derived.by(() => {
    if (type == ResourceCardType) {
      return "Ressources";
    } else if (type == CodirEventCardType) {
      return "CODIR";
    } else if (type == ActionCardType) {
      return "Actions";
    } else if (type == ProjectCardType) {
      return "Projects";
    } else {
      throw new Error(`${type} is not yet supported`);
    }
  });

  let cards: CardType[] = $derived.by(() => {
    if (type == ResourceCardType) {
      return resourceCards.cards;
    } else if (type == CodirEventCardType) {
      return codirEventCards.cards;
    } else if (type == ActionCardType) {
      return actionCards.cards;
    } else if (type == ProjectCardType) {
      return projectCards.cards;
    } else {
      throw new Error(`${type} is not yet supported`);
    }
  });

  let filteredCards = $state([]);
  let searchQuery: string = $state("");
  let isGradeSortAsc: boolean = $state(false);
  let isTitleSortAsc: boolean = $state(false);
  let isClientSortAsc: boolean = $state(false);
  let selectedGrades: string[] = $state(
    type == ResourceCardType ? grades.map((grade) => grade.value) : [],
  );
  let selectedClients: string[] = $state(
    type == ProjectCardType ? clients.clients.map((client) => client.id) : [],
  );

  function addNewCard() {
    cards.push(newCard(type));
  }

  function deleteCard(cardToDelete: CardType) {
    if (type == ResourceCardType) {
      resourceCards.cards = cards.filter(
        (card) => card !== cardToDelete,
      ) as ResourceCardType[];
    } else if (type == CodirEventCardType) {
      codirEventCards.cards = cards.filter(
        (card) => card !== cardToDelete,
      ) as CodirEventCardType[];
    } else if (type == ActionCardType) {
      actionCards.cards = cards.filter(
        (card) => card !== cardToDelete,
      ) as ActionCardType[];
    } else if (type == ProjectCardType) {
      projectCards.cards = cards.filter(
        (card) => card !== cardToDelete,
      ) as ProjectCardType[];
    }
  }

  function toggleGradeSelection(gradeValue: string) {
    if (selectedGrades.includes(gradeValue)) {
      selectedGrades = selectedGrades.filter((grade) => grade !== gradeValue);
    } else {
      selectedGrades = [...selectedGrades, gradeValue];
    }
  }

  function toggleClientSelection(clientId: string) {
    if (selectedClients.includes(clientId)) {
      selectedClients = selectedClients.filter((client) => client !== clientId);
    } else {
      selectedClients = [...selectedClients, clientId];
    }
  }

  let onDeleteAccessor = {
    deleteCard,
  };

  $effect(() => {
    filteredCards = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedGrades.length == 0 || selectedGrades.includes(card.grade)) &&
        (selectedClients.length == 0 || selectedClients.includes(card.client)),
    );
  });

  function clearSearch() {
    searchQuery = "";
  }

  function sortByGrade() {
    isGradeSortAsc = isGradeSortAsc != true;
    filteredCards = [...filteredCards].sort((a, b) => {
      if (a.grade < b.grade) return isGradeSortAsc ? -1 : 1;
      if (a.grade > b.grade) return isGradeSortAsc ? 1 : -1;
      return 0;
    });
  }

  function sortByTitle() {
    isTitleSortAsc = isTitleSortAsc != true;
    filteredCards = [...filteredCards].sort((a, b) => {
      if (a.title < b.title) return isTitleSortAsc ? -1 : 1;
      if (a.title > b.title) return isTitleSortAsc ? 1 : -1;
      return 0;
    });
  }

  function sortByClient() {
    isClientSortAsc = isClientSortAsc != true;
    filteredCards = [...filteredCards].sort((a, b) => {
      if (a.client < b.client) return isClientSortAsc ? -1 : 1;
      if (a.client > b.client) return isClientSortAsc ? 1 : -1;
      return 0;
    });
  }
</script>

<div class="sticky top-16 z-10 bg-auto bg-white dark:bg-gray-800">
  <div class="flex items-center justify-center w-full p-2">
    <Heading tag="h1" customSize="text-4xl font-bold" class="p-2">
      Cartes <Span gradient>{title}</Span>
      <Secondary>
        ({#if filteredCards.length != cards.length}{filteredCards.length} sur&nbsp;{/if}{cards.length})
      </Secondary>
    </Heading>
  </div>

  <!-- Filter and sort buttons-->
  <div class="flex flex-col md:flex-row items-center space-x-2 w-full p-2">
    <!-- Filter input-->
    <div class="flex p-2 input-container w-full">
      <Input
        bind:value={searchQuery}
        placeholder="Search cards by title..."
        class="w-full"
      />
      {#if searchQuery}
        <button class="clear-button" onclick={clearSearch}>&times;</button>
      {/if}
    </div>

    <!-- Sort buttons-->
    <div class="flex items-center space-x-2">
      <GradientButton color="greenToBlue" on:click={sortByTitle}
        ><SortOutline /> Titre</GradientButton
      >
      {#if type == ResourceCardType}
        <GradientButton color="greenToBlue" on:click={sortByGrade}
          ><SortOutline /> Grade</GradientButton
        >
        <GradientButton color="greenToBlue"
          ><FilterOutline /> Grade</GradientButton
        >
        <Dropdown class="w-44 p-3 space-y-3 text-sm">
          {#each grades.map((grade) => grade.value) as gradeValue}
            <li>
              <Checkbox
                checked={selectedGrades.includes(gradeValue)}
                on:click={() => toggleGradeSelection(gradeValue)}
                >{gradeValue}</Checkbox
              >
            </li>
          {/each}
        </Dropdown>
      {/if}
      {#if type == ProjectCardType}
        <GradientButton color="greenToBlue" on:click={sortByClient}
          ><SortOutline /> Client</GradientButton
        >
        <GradientButton color="greenToBlue"
          ><FilterOutline /> Client</GradientButton
        >
        <Dropdown class="w-44 p-3 space-y-3 text-sm">
          {#each clients.clients as client}
            <li>
              <Checkbox
                checked={selectedClients.includes(client.id)}
                on:click={() => toggleClientSelection(client.id)}
                >{client.name}</Checkbox
              >
            </li>
          {/each}
        </Dropdown>
      {/if}

      <!-- New card button -->
      <Button pill={true} class="p-2!" on:click={addNewCard}
        ><AddColumnAfterOutline class="w-6 h-6" /></Button
      >
    </div>
  </div>
</div>

<div class="flex flex-wrap justify-center">
  {#each filteredCards as _, index}
    <div class="p-2">
      {#if type == ProjectCardType}
        <ProjectCard bind:card={filteredCards[index]} {onDeleteAccessor} />
      {:else}
        <Card bind:card={filteredCards[index]} {onDeleteAccessor} />
      {/if}
    </div>
  {/each}
</div>

<style>
  .input-container {
    position: relative;
  }

  .clear-button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-55%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: gray;
  }
</style>
