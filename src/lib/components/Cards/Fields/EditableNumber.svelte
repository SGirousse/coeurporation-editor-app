<script lang="ts">
    let { value = $bindable(), isEditable = true } = $props();
    let isEditionActive = $state(false);
</script>

{#if isEditionActive}
    <input
        type="number"
        bind:value
        class="edited border-none p-0 leading-tight focus:outline-none text-left w-fit"
        placeholder="e.g. 20"
        onblur={() => (isEditionActive = false)}
        onkeydown={(e) => e.key === "Enter" && (isEditionActive = false)}
    />
{:else}
    <button
        class="text-end w-fit"
        onclick={() => (isEditionActive = isEditable)}
        >{#if value}{value}{:else}0{/if}</button
    >
{/if}
