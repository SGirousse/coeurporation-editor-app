<script>
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import Hand from "$lib/components/Game/Hand.svelte";
    import {
        resourceCards,
        codirEventCards,
        actionCards,
        projectCards,
    } from "$lib/components/GameManager.svelte";
    import Card from "$lib/components/Cards/Card.svelte";
    let items = resourceCards.cards;
    const flipDurationMs = 100;
    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }
</script>

<section
    class="w-full h-fit bg-red-100 flex pl-0.5 pt-0.5 pb-0.5 overflow-auto"
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
>
    {#each items as card (card.id)}
        <div
            class="w-fit pl-0.5 pt-0.5"
            animate:flip={{ duration: flipDurationMs }}
        >
            <Card {card} isEditable={false} />
        </div>
    {/each}
</section>

<Hand />
