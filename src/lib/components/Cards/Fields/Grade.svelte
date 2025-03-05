<script lang="ts">
    import { grades } from "$lib";

    let { grade = $bindable("") } = $props();

    let gradeColor = $state("");
    updateGradeValue(grade);

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
</script>

<select
    name="grades"
    class="{gradeColor} compact-select flex h-6 w-6 rounded-full text-white text-center focus:outline-none p-0 m-0"
    onchange={handleSelectGradeChange}
    bind:value={grade}
>
    {#each grades as gradeData}
        <option value={gradeData.value} selected={grade === gradeData.value}
            >{gradeData.value}</option
        >
    {/each}
</select>
