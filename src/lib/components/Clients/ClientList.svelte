<script lang="ts">
    import { Button, Heading, Input, Secondary, Span } from "flowbite-svelte";
    import { UserAddOutline } from "flowbite-svelte-icons";
    import { ClientType } from "$lib";
    import Client from "./Client.svelte";

    let { clients = $bindable([]) } = $props();
    let searchQuery: string = $state("");
    let filteredClients: ClientType[] = $state([]);

    function addNewClient() {
        const client = new ClientType({
            id: `${(clients.length + 1).toString().padStart(3, "0")}`,
        });
        clients = [...clients, client];
    }
    function clearSearch() {
        searchQuery = "";
    }

    $effect(() => {
        filteredClients = clients.filter((client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    });
</script>

<div class="sticky top-16 z-10 bg-auto bg-white dark:bg-gray-800">
    <div class="flex items-center justify-center w-full p-2">
        <Heading tag="h1" customSize="text-4xl font-extrabold" class="p-2">
            Infos <Span gradient>Clients</Span>
            <Secondary>
                ({#if filteredClients.length != clients.length}{filteredClients.length}
                    sur&nbsp;{/if}{clients.length})
            </Secondary>
        </Heading>
    </div>

    <!-- Filter and sort buttons-->
    <div class="flex flex-col md:flex-row items-center space-x-2 w-full p-2">
        <!-- Filter input-->
        <div class="flex p-2 input-container w-full">
            <Input
                bind:value={searchQuery}
                placeholder="Search client by name..."
                class="w-full min-w-100"
            />
            {#if searchQuery}
                <button class="clear-button" onclick={clearSearch}
                    >&times;</button
                >
            {/if}
        </div>

        <div class="flex items-center space-x-2 p-2">
            <Button pill={true} class="p-2!" on:click={addNewClient}
                ><UserAddOutline class="w-6 h-6" /></Button
            >
        </div>
    </div>
</div>
<div class="flex flex-wrap justify-center">
    {#each filteredClients as _, index}
        <Client bind:client={filteredClients[index]} />
    {/each}
</div>
