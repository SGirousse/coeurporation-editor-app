<script lang="ts">
    import { coeurpormarked } from "$lib/components/Helper/Coeurpormarked.svelte";
    import { Spinner } from "flowbite-svelte";
    import EditableNumber from "./EditableNumber.svelte";

    let {
        card,
        markdownText = $bindable(),
        textAeraTitle = "",
        threshold = $bindable(),
        additionalClass = "",
        isEditable = true,
    } = $props();

    let isEditionActive = $state(false);
</script>

{#if textAeraTitle}
    <div
        class="absolute left top-0 transform text-xs flex items-center font-bold"
    >
        {textAeraTitle}
        {#if threshold}
            (<EditableNumber bind:value={threshold} />)
        {/if}
    </div>
{/if}
{#if isEditionActive}
    <textarea
        bind:value={markdownText}
        class="{textAeraTitle
            ? 'pt-4'
            : ''} p-0 bg-gray-300 text-black border-none leading-tight focus:outline-none text-justify {additionalClass}"
        onblur={() => (isEditionActive = false)}
    ></textarea>
{:else}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="{textAeraTitle
            ? 'pt-4'
            : ''} h-full overflow-hidden leading-tight text-justify {additionalClass}"
        onclick={() => (isEditionActive = isEditable)}
    >
        {#await coeurpormarked(markdownText, card)}
            <Spinner />
        {:then htmlText}
            {@html htmlText}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
{/if}
