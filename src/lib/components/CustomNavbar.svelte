<script lang="ts">
    import {
        Fileupload,
        Button,
        Tooltip,
        Navbar,
        NavBrand,
        DarkMode,
        NavHamburger,
        NavUl,
        NavLi,
        Modal,
        Spinner,
    } from "flowbite-svelte";
    import { FloppyDiskAltOutline, UploadOutline } from "flowbite-svelte-icons";
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import CardThemeButton from "./Cards/CardThemeButton.svelte";
    import {
        resourceCards,
        codirEventCards,
        actionCards,
        projectCards,
        clients,
        loadFromFile,
        writeFileContent,
    } from "./GameManager.svelte";

    let files: FileList | undefined = $state();
    let uploadSaveModal = $state(false);
    let isLoadInProgress = $state(false);

    let gameElementsNumber = $derived(
        [
            ...resourceCards.cards,
            ...codirEventCards.cards,
            ...actionCards.cards,
            ...clients.clients,
        ].length,
    );

    async function saveCardsToFile() {
        writeFileContent(
            resourceCards.cards,
            codirEventCards.cards,
            actionCards.cards,
            projectCards.cards,
            clients.clients,
        );
    }

    // create a dedicated function to manage async action (unsupported in $effect)
    async function uploadFromFile(files: any) {
        isLoadInProgress = true;
        uploadSaveModal = false;
        await loadFromFile(files);
        files = undefined;
        isLoadInProgress = false;
    }

    $effect(() => {
        if (files) {
            uploadFromFile(files);
        }
    });
</script>

<Navbar class="fixed top-0 w-full z-100 h-16" fluid>
    <NavBrand href="{base}/">
        <span
            class="flex justify-center items-center self-center text-center text-xl font-semibold whitespace-nowrap space-x-1"
        >
            <span class="hidden md:block">Coeurporation Editor App</span>
        </span>
    </NavBrand>
    <NavHamburger />
    <NavUl
        activeUrl={page.url.pathname}
        activeClass="underline decoration-primary-800 bg-primary-700 text-white md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent"
    >
        <NavLi href="{base}/">Home</NavLi>
        <NavLi href="{base}/editor">Editeur</NavLi>
        <NavLi href="{base}/print">Impression</NavLi>
    </NavUl>
    <div
        class="flex items-center justify-center self-center text-center space-x-2"
    >
        <div class="flex items-center space-x-2">
            <Button
                onclick={() => (uploadSaveModal = true)}
                disabled={isLoadInProgress}
            >
                {#if isLoadInProgress}
                    <Spinner size="4" color="white" />
                {:else}
                    <UploadOutline />
                {/if}
            </Button>
            <Tooltip>Charger une sauvegarde</Tooltip>
            <Button onclick={saveCardsToFile} disabled={gameElementsNumber < 1}
                ><FloppyDiskAltOutline /></Button
            >
            <Tooltip>Enregistrer</Tooltip>
        </div>
        <CardThemeButton />
        <DarkMode />
    </div>
</Navbar>
<Modal title="Charger une sauvegarde" bind:open={uploadSaveModal} autoclose>
    <Fileupload id="with_helper" bind:files />
    <svelte:fragment slot="footer">
        <Button color="alternative">Annuler</Button>
    </svelte:fragment>
</Modal>
