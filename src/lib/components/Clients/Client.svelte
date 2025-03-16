<script lang="ts">
    import ImageSelector from "../Helper/ImageSelector.svelte";

    let { client = $bindable() } = $props();
</script>

<div
    class="flex flex-col space-y-2 bg-amber-50 m-1 p-1"
    id={`client-${client.uuid}`}
>
    <div class="flex">
        <input
            type="text"
            bind:value={client.name}
            class="edited border-none p-0 text-lg font-bold focus:outline-none w-full"
        />
        #{client.id}
    </div>
    <div class="w-full flex justify-center">
        <div class="relative w-[44mm] h-[44mm] edited rounded-full">
            <ImageSelector
                illustration={client.illustration}
                imageShape="round"
            />
        </div>
    </div>
    <div class="">
        <input
            type="number"
            bind:value={client.comboThreshold}
            class="edited border-none p-0 text-[12px] leading-tight focus:outline-none w-full"
            placeholder="Seuil du combo (e.g. 3)"
        />
        <textarea
            bind:value={client.comboEffect}
            class="p-0 pt-2 edited border-none text-[12px] leading-tight focus:outline-none text-justify w-full"
            placeholder="Description de l'effet du combo"
            rows="10"
        ></textarea>
    </div>
</div>
