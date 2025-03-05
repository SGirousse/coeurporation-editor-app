<script lang="ts">
    import { Button, Heading, Span } from "flowbite-svelte";
    import { UserAddOutline } from "flowbite-svelte-icons";
    import { ClientType } from "$lib";
    import Client from "./Client.svelte";

    let { clients = $bindable([]) } = $props();

    function addNewClient() {
        const client = new ClientType({
            id: `${(clients.length + 1).toString().padStart(3, "0")}`,
        });
        clients = [...clients, client];
    }
</script>

<div class="flex flex-col md:flex-row p-2">
    <div class="flex items-center justify-center w-full p-2">
        <Heading tag="h1" customSize="text-4xl font-extrabold" class="p-2">
            Infos <Span gradient>clients</Span>
        </Heading>
    </div>

    <div class="flex flex-col md:flex-row items-center space-x-2 w-full p-2">
        <Button pill={true} class="p-2!" on:click={addNewClient}
            ><UserAddOutline class="w-6 h-6" /></Button
        >
    </div>
</div>
<div class="flex flex-wrap justify-center">
    {#each clients as client}
        <Client {client} />
    {/each}
</div>
