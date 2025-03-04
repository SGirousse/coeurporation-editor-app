<script lang="ts">
  import Card from "./Card.svelte";
  import ProjectCard from "../Editor/ProjectCard.svelte";
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
  } from "flowbite-svelte";
  import { AddColumnAfterOutline, SortOutline } from "flowbite-svelte-icons";
  let { cards = $bindable([]), title, type } = $props();

  let filteredCards: CardType[] = $state([]);
  let searchQuery: string = $state("");
  let isGradeSortAsc: boolean = $state(false);
  let isTitleSortAsc: boolean = $state(false);
  let isClientSortAsc: boolean = $state(false);

  function addNewCard() {
    const newCard = new type();
    cards = [...cards, newCard];
  }

  function deleteCard(cardToDelete: CardType) {
    cards = cards.filter((card) => card !== cardToDelete);
  }

  let onDeleteAccessor = {
    deleteCard,
  };

  $effect(() => {
    filteredCards = cards.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
      >({#if searchQuery}{filteredCards.length} sur&nbsp;
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
    {/if}
    {#if type == ProjectCardType}
      <GradientButton color="greenToBlue" on:click={sortByClient}
        ><SortOutline /> Client</GradientButton
      >
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
