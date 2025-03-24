<script lang="ts">
	import {
		ResourceCardType,
		CodirEventCardType,
		ActionCardType,
		ProjectCardType,
	} from "$lib/components/Cards/CardType.svelte";
	import CardList from "$lib/components/Cards/CardList.svelte";
	import ClientList from "$lib/components/Clients/ClientList.svelte";
</script>

<div class="w-full h-full">
	<CardList type={ResourceCardType} />
	<CardList type={CodirEventCardType} />
	<CardList type={ActionCardType} />
	<CardList type={ProjectCardType} />
	<ClientList />
</div>
