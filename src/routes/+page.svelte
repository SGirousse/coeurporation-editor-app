<script lang="ts">
	import { base } from "$app/paths";
	import { Card, Heading, Hr, Span } from "flowbite-svelte";
	import { EditOutline, PrinterOutline } from "flowbite-svelte-icons";
</script>

<div class="flex items-center justify-center h-full w-full">
	<div class="flex flex-wrap md:space-x-2 space-x-0 space-y-2 md:space-y-0">
		<Card href="{base}/editor">
			<Heading
				tag="h1"
				customSize="text-4xl font-bold text-center"
				class="p-2"
			>
				<Span gradient>Editeur de jeu</Span>
			</Heading>
			<Hr />
			<div class="flex items-center space-x-2">
				<EditOutline size="xl" />
				<p
					class="font-normal text-gray-700 dark:text-gray-400 leading-tight text-justify"
				>
					Accède à l'éditeur de jeu et crée un nouvel ensemble que tu
					peux ensuite sauvegarder localement. Reviens à tout moment
					pour le mettre à jour !
				</p>
			</div>
		</Card>

		<Card href="{base}/print">
			<Heading
				tag="h1"
				customSize="text-4xl font-bold text-center"
				class="p-2"
			>
				<Span gradient>Impression</Span>
			</Heading>
			<Hr />
			<div class="flex items-center space-x-2">
				<PrinterOutline size="xl" />
				<p
					class="font-normal text-gray-700 dark:text-gray-400 leading-tight text-justify"
				>
					Affiche une prévisualisation de tes cartes au format A4,
					avec ou sans le dos, et lance une impression grandeur nature
					!
				</p>
			</div>
		</Card>
	</div>
</div>
