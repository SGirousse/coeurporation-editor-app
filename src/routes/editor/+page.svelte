<script>
    import Card from "$lib/Cards/ResourceCard.svelte";
    import { writable } from 'svelte/store';
  
    let title = writable("Card Title");
    let badge = writable("A");
    let shortDescription = writable("Short description of the image.");
    let longText = writable("This is a longer text area that takes up about 30% of the card height.");
    let batteryValue = writable(5);
    let moneyValue = writable("35k");
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <Card title={$title} 
    badge={$badge} 
    shortDescription={$shortDescription} 
    longText={$longText} 
    batteryValue={$batteryValue} 
    moneyValue={$moneyValue}  />
  
    <div class="flex flex-col space-y-2">
      <label>
        Title:
        <input type="text" bind:value={$title} class="border p-1 rounded" />
      </label>
      <label>
        Badge:
        <input type="text" bind:value={$badge} class="border p-1 rounded" />
      </label>
      <label>
        Short Description:
        <input type="text" bind:value={$shortDescription} class="border p-1 rounded" />
      </label>
      <label>
        Long Text:
        <textarea bind:value={$longText} class="border p-1 rounded"></textarea>
      </label>
      <label>
        Battery Value:
        <input type="number" bind:value={$batteryValue} class="border p-1 rounded" />
      </label>
      <label>
        Money Value:
        <input type="text" bind:value={$moneyValue} class="border p-1 rounded" />
      </label>
    </div>
  </div>