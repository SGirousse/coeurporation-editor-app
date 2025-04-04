<script>
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import Card from "../Cards/Card.svelte";
    let { items = [] } = $props();
    const flipDurationMs = 100;

    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }
</script>

<section
    class="w-full h-fit min-h-44 bg-amber-100 flex overflow-auto"
    use:dndzone={{ items, flipDurationMs }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}
>
    {#each items as card (card.id)}
        <div
            animate:flip={{ duration: flipDurationMs }}
            class="w-fit p-0 border border-blue-300"
        >
            <Card {card} isEditable={false} />
        </div>
    {/each}
</section>
