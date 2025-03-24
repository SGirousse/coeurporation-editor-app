<script lang="ts">
    import Icon from "@iconify/svelte";
    import { actionTypes } from "$lib/components/Cards/CardType.svelte";

    let { actionType = $bindable(), isEditable = true } = $props();

    let actionTypeColor = $state("");
    let isDropdownOpen = $state(false);

    async function updateActionTypeValue(actionTypeValue: string) {
        const actionTypeItem = actionTypes.find(
            (actionTypeItem) => actionTypeItem.value === actionTypeValue,
        );
        if (actionTypeItem) {
            actionType = actionTypeItem.value;
            actionTypeColor = actionTypeItem.color;
        }
        isDropdownOpen = false;
    }

    $effect(() => {
        updateActionTypeValue(actionType);
    });
</script>

<div
    class="relative rounded-full border min-h-[6mm] max-h-[6mm] min-w-[6mm] max-w-[6mm]"
>
    <!-- Dropdown toggle -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="{actionTypeColor} flex rounded-full text-center justify-center items-center focus:outline-none min-h-[6mm] max-h-[6mm] min-w-[6mm] max-w-[6mm]"
        onclick={() => (isDropdownOpen = isEditable ? !isDropdownOpen : false)}
    >
        <Icon
            icon={actionTypes.find((item) => item.value === actionType)?.icon ||
                "tabler:link"}
            width="14"
            height="14"
        />
    </div>

    <!-- Dropdown menu -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    {#if isDropdownOpen}
        <div
            class="absolute top-full left-0 z-1000 flex flex-col overflow-y-auto border bg-white p-1"
        >
            {#each actionTypes as actionTypeData}
                <div
                    class="flex items-center"
                    onclick={() => updateActionTypeValue(actionTypeData.value)}
                >
                    <Icon icon={actionTypeData.icon} width="14" height="14" />
                </div>
            {/each}
        </div>
    {/if}
</div>
