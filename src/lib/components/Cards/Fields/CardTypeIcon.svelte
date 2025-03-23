<script lang="ts">
    import {
        CartPlusAltSolid,
        ChartMixedDollarSolid,
        BugSolid,
    } from "flowbite-svelte-icons";

    let { type } = $props();
</script>

{#if type == "ResourceCardType"}
    <CartPlusAltSolid />
{:else if type == "CodirEventCardType"}
    <ChartMixedDollarSolid />
{:else if type == "ActionCardType"}
    <BugSolid />
{/if}
