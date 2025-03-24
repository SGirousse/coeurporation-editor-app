<script lang="ts">
    import { grades } from "$lib/components/Cards/CardType.svelte";

    let { grade = $bindable(""), isEditable = true } = $props();

    let gradeColor = $state("");

    async function handleSelectGradeChange(event: any) {
        updateGradeValue(event.target.value);
    }

    async function updateGradeValue(grade: string) {
        const gradeItem = grades.find((gradeItem) => gradeItem.value === grade);
        if (gradeItem) {
            grade = gradeItem.value;
            gradeColor = gradeItem.color;
        }
    }

    $effect(() => {
        updateGradeValue(grade);
    });
</script>

<select
    name="grades"
    class="{gradeColor} compact-select flex min-h-[6mm] max-h-[6mm] min-w-[6mm] max-w-[6mm] rounded-full text-white text-center focus:outline-none p-0 m-0"
    onchange={handleSelectGradeChange}
    bind:value={grade}
    disabled={!isEditable}
>
    {#each grades as gradeData}
        <option value={gradeData.value} selected={grade === gradeData.value}
            >{gradeData.value}</option
        >
    {/each}
</select>
