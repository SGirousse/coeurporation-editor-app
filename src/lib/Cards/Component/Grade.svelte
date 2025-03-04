<script lang="ts">
    let { grade = $bindable("") } = $props();

    const grades = [
        { value: "", color: "bg-white" },
        { value: "Stg", color: "bg-teal-500" },
        { value: "A", color: "bg-green-500" },
        { value: "B", color: "bg-blue-500" },
        { value: "C", color: "bg-yellow-500" },
        { value: "D", color: "bg-orange-500" },
        { value: "E", color: "bg-purple-500" },
        { value: "S", color: "bg-amber-500" },
    ];

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
