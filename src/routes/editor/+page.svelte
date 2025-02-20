<script>
    import Card from "$lib/Cards/ResourceCard.svelte";
    import { writable } from 'svelte/store';
  
    let title = writable("Card Title");
    let grade = writable("A");
    let lore = writable("Short effect of the image.");
    let effect = writable("This is a longer text area that takes up about 30% of the card height.");
    let burnoutPoints = writable(5);
    let cost = writable("35k");
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <Card title={$title} 
    grade={$grade} 
    lore={$lore} 
    effect={$effect} 
    burnoutPoints={$burnoutPoints} 
    cost={$cost}  />
  
    <div class="flex flex-col space-y-2">
      <label>
        Title:
        <input type="text" bind:value={$title} class="border p-1 rounded" />
      </label>
      <label>
        grade:
        <input type="text" bind:value={$grade} class="border p-1 rounded" />
      </label>
      <label>
        Short effect:
        <input type="text" bind:value={$lore} class="border p-1 rounded" />
      </label>
      <label>
        Long Text:
        <textarea bind:value={$effect} class="border p-1 rounded"></textarea>
      </label>
      <label>
        Battery Value:
        <input type="number" bind:value={$burnoutPoints} class="border p-1 rounded" />
      </label>
      <label>
        Money Value:
        <input type="text" bind:value={$cost} class="border p-1 rounded" />
      </label>
    </div>
  </div>