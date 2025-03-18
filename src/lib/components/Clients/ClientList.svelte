<script lang="ts">
    import { Button, Heading, Input, Secondary, Span } from "flowbite-svelte";
    import { UserAddOutline } from "flowbite-svelte-icons";
    import { ClientType } from "$lib";
    import Client from "./Client.svelte";
    import { clients } from "$lib/components/Cards/ResourceCard.svelte";
    import { newClient } from "$lib/utils/cardGenerator";

    let searchQuery: string = $state("");
    let filteredClients: ClientType[] = $state([]);

    function addNewClient() {
        clients.clients.push(newClient());
    }
    function clearSearch() {
        searchQuery = "";
    }

    $effect(() => {
        filteredClients = clients.clients.filter((client) =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    });
</script>

<div class="sticky top-16 z-10 bg-auto bg-white dark:bg-gray-800">
    <div class="flex flex-wrap items-center justify-center w-full p-2">
        <Heading
            tag="h1"
            customSize="text-4xl font-bold"
            class="p-2 w-full md:w-1/3"
        >
            Infos <Span gradient>Clients</Span>
            <Secondary>
                ({#if filteredClients.length != clients.clients.length}{filteredClients.length}
                    sur&nbsp;{/if}{clients.clients.length})
            </Secondary>
        </Heading>

        <!-- Filter and sort buttons-->
        <div
            class="flex flex-wrap lg:flex-nowrap items-center space-x-2 w-full md:w-2/3 p-2"
        >
            <!-- Filter input-->
            <div class="flex p-2 input-container w-full min-w-1/3">
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

            <div class="flex items-center justify-end space-x-2 w-full">
                <Button pill={true} class="p-2!" on:click={addNewClient}
                    ><UserAddOutline class="w-6 h-6" /></Button
                >
            </div>
        </div>
    </div>
</div>
<div class="flex flex-wrap justify-center">
    {#each filteredClients as _, index}
        <Client bind:client={filteredClients[index]} />
    {/each}
</div>
