<script lang="ts">
    import { page } from "$app/state";
    import { Toast, type ColorVariant } from "flowbite-svelte";
    import { ShareNodesOutline } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";
    // let { title, grade, effect, lore, bp, cost } = $props();
    let { card } = $props();

    let toastStatus = $state(false);
    let toastCounter = $state(3);
    let shareMessage = $state();
    let shareStatusColor: ColorVariant = $state("dark");

    function shareCard() {
        let shareLink = page.url.origin + "/preview?";
        const { illustration: _, ...cardWithoutIllustration } = card;
        shareLink += "card=" + JSON.stringify(cardWithoutIllustration);
        shareLink = encodeURI(shareLink);

        navigator.permissions
            .query({ name: "clipboard-write" as any })
            .then((result) => {
                if (result.state == "granted" || result.state == "prompt") {
                    navigator.clipboard.writeText(shareLink).then(
                        function () {
                            shareMessage = `Lien copié dans le presse-papier`;
                            shareStatusColor = "green";
                            toastStatus = true;
                            toastMessageTimeout();
                        },
                        function () {
                            shareMessage = `Une erreur est survenue lors de la copie`;
                            shareStatusColor = "red";
                            toastStatus = true;
                            toastMessageTimeout();
                        },
                    );
                }
            });
    }

    function toastMessageTimeout() {
        if (--toastCounter > 0) return setTimeout(toastMessageTimeout, 1000);
        toastStatus = false;
        shareStatusColor = "dark";
        toastCounter = 3;
    }
</script>

<div class="fixed bottom-16 right-5">
    <Toast transition={slide} bind:toastStatus color={shareStatusColor}>
        <svelte:fragment slot="icon">
            <ShareNodesOutline class="w-5 h-5" />
            <span class="sr-only">Check icon</span>
        </svelte:fragment>{shareMessage}</Toast
    >
</div>
<button
    onclick={shareCard}
    disabled={toastStatus}
    class="rounded bg-{shareStatusColor}-200 text-{shareStatusColor}-700 p-1 opacity-0 transition-opacity group-hover:opacity-100"
>
    <ShareNodesOutline />
</button>
