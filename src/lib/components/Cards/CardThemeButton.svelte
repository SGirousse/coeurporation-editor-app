<script lang="ts">
    import { Button, Tooltip } from "flowbite-svelte";
    import { PaletteOutline } from "flowbite-svelte-icons";
    import { currentCardTheme, switchTheme } from "./CardTheme.svelte";
</script>

<Button onclick={() => switchTheme()}><PaletteOutline /></Button>
<Tooltip>{currentCardTheme.value.name}</Tooltip>
