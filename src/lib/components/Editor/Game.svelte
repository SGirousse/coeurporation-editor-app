<script lang="ts">
    import {
        ResourceCardType,
        CodirEventCardType,
        ActionCardType,
        ProjectCardType,
    } from "$lib/index.js";
    import CardList from "../Cards/CardList.svelte";
    import ClientList from "../Clients/ClientList.svelte";
    let {
        resourceCards = $bindable([new ResourceCardType()]),
        codirEventCards = $bindable([new CodirEventCardType()]),
        actionCards = $bindable([new ActionCardType()]),
        projectCards = $bindable([new ProjectCardType()]),
        clients = $bindable([]),
    } = $props();
</script>

<div class="w-full h-full">
    <CardList
        bind:cards={resourceCards}
        title={"Ressources"}
        type={ResourceCardType}
    />
    <CardList
        bind:cards={codirEventCards}
        title={"CODIR"}
        type={CodirEventCardType}
    />
    <CardList
        bind:cards={actionCards}
        title={"Actions"}
        type={ActionCardType}
    />
    <CardList
        bind:cards={projectCards}
        title={"Projets"}
        type={ProjectCardType}
        {clients}
    />

    <ClientList bind:clients />
</div>
