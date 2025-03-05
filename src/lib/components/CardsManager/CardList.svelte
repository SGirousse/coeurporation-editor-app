<script lang="ts">
  import Card from "../Cards/Card.svelte";
  import { grades, clients } from "$lib";
  import ProjectCard from "../Cards/ProjectCard.svelte";
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
  let { cards = $bindable([]), title, type } = $props();

  let filteredCards: CardType[] = $state([]);
  let searchQuery: string = $state("");
  let isGradeSortAsc: boolean = $state(false);
  let isTitleSortAsc: boolean = $state(false);
  let isClientSortAsc: boolean = $state(false);
  let selectedGrades: string[] = $state(
    type == ResourceCardType ? grades.map((grade) => grade.value) : [],
  );
  let selectedClients: string[] = $state(
    type == ProjectCardType ? clients.map((client) => client.id) : [],
  );

  function addNewCard() {
    const newCard = new type();
    cards = [...cards, newCard];
  }

  function deleteCard(cardToDelete: CardType) {
    cards = cards.filter((card) => card !== cardToDelete);
  }

  function toggleGradeSelection(gradeValue: string) {
    if (selectedGrades.includes(gradeValue)) {
      selectedGrades = selectedGrades.filter((grade) => grade !== gradeValue);
    } else {
      selectedGrades = [...selectedGrades, gradeValue];
    }
  }

  function toggleClientSelection(clientName: string) {
    if (selectedClients.includes(clientName)) {
      selectedClients = selectedClients.filter(
        (client) => client !== clientName,
      );
    } else {
      selectedClients = [...selectedClients, clientName];
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
    cards = [...cards].sort((a, b) => {
      if (a.grade < b.grade) return isGradeSortAsc ? -1 : 1;
      if (a.grade > b.grade) return isGradeSortAsc ? 1 : -1;
      return 0;
    });
  }

  function sortByTitle() {
    isTitleSortAsc = isTitleSortAsc != true;
    cards = [...cards].sort((a, b) => {
      if (a.title < b.title) return isTitleSortAsc ? -1 : 1;
      if (a.title > b.title) return isTitleSortAsc ? 1 : -1;
      return 0;
    });
  }

  function sortByClient() {
    isClientSortAsc = isClientSortAsc != true;
    cards = [...cards].sort((a, b) => {
      if (a.client < b.client) return isClientSortAsc ? -1 : 1;
      if (a.client > b.client) return isClientSortAsc ? 1 : -1;
      return 0;
    });
  }
</script>

<div class="flex p-2">
  <Heading tag="h1" class="mb-2" customSize="text-5xl font-extrabold">
    Cartes <Span gradient>{title}</Span>
    <Secondary
      >({#if filteredCards.length != cards.length}{filteredCards.length} sur&nbsp;
      {/if}{cards.length})</Secondary
    >
  </Heading>

  <!-- Filter and sort buttons-->
  <div class="flex items-center space-x-2 w-full">
    <!-- Filter input-->
    <div class="flex p-2 input-container">
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
            <Checkbox checked on:click={() => toggleGradeSelection(gradeValue)}
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
        {#each clients as client}
          <li>
            <Checkbox checked on:click={() => toggleClientSelection(client.id)}
              >{client.name}</Checkbox
            >
          </li>
        {/each}
      </Dropdown>
    {/if}
  </div>

  <!-- New card button -->
  <div class="flex items-center space-x-2">
    <Button pill={true} class="p-2!" on:click={addNewCard}
      ><AddColumnAfterOutline class="w-6 h-6" /></Button
    >
  </div>
</div>

<div class="flex flex-wrap justify-center">
  {#each filteredCards as card}
    <div class="p-2">
      {#if type == ProjectCardType}
        <ProjectCard projectCard={card as ProjectCardType} {onDeleteAccessor} />
      {:else}
        <Card {card} {onDeleteAccessor} />
      {/if}
    </div>
  {/each}
  <div class="p-2"></div>
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
