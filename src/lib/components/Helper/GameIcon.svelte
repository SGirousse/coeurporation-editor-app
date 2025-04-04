<script lang="ts">
    import { getIconValue, ICON_BASE } from "./IconManager.svelte";

    let {
        name,
        category = ICON_BASE,
        width = "w-4",
        height = "h-4",
    } = $props();

    const icon = $derived(getIconValue(name, category, width, height));
</script>

{@html icon}
