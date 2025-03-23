<script lang="ts">
    import { v4 as uuidv4 } from "uuid";
    import {
        CheckCircleOutline,
        CloseCircleOutline,
    } from "flowbite-svelte-icons";
    import Cropper from "svelte-easy-crop";

    let {
        illustration = $bindable(""),
        uuid = uuidv4(),
        imageShape = "rect",
        isEditable = true,
    } = $props();

    // Boolean for modals activation/deactivation
    let isCropActive = $state(false);

    // Files to be cropped and the crop informations (pre-initialized)
    let tmpIllustration = $state("");
    let cropArea = $state({ pixels: { x: 0, y: 0, width: 0, height: 0 } });
    let cropSize = $state({ width: 220, height: 128.5 });

    /**
     * Load file and then start a crop session on it.
     *
     * @param event file input event.
     */
    function handleImageChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    tmpIllustration = reader.result as string;
                }
            };
            reader.readAsDataURL(file);

            // Calculate crop size based on parent div dimensions
            const parentDiv = document.getElementById(uuid);
            if (parentDiv) {
                const rect = parentDiv.getBoundingClientRect();
                cropSize = { width: rect.width, height: rect.height };

                isCropActive = true;
            }
        }
    }

    /**
     * When user validate its crop selection, start `tmpIllustration` update.
     *
     * In the end, the `illustration` is being updated with the `tmpIllustration` cropped content.
     */
    async function onCropComplete() {
        const image = new Image();
        image.src = tmpIllustration;

        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Failed to get canvas context");
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelRatio = window.devicePixelRatio;

        canvas.width = cropArea.pixels.width * pixelRatio;
        canvas.height = cropArea.pixels.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            cropArea.pixels.x * scaleX,
            cropArea.pixels.y * scaleY,
            cropArea.pixels.width * scaleX,
            cropArea.pixels.height * scaleY,
            0,
            0,
            cropArea.pixels.width,
            cropArea.pixels.height,
        );

        return new Promise<string>(() => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        illustration = reader.result as string;
                        isCropActive = false;
                    };
                    reader.readAsDataURL(blob);
                }
            }, "image/png");
        });
    }

    async function cancelCrop() {
        isCropActive = false;
        tmpIllustration = "";
    }
</script>

<div id={uuid} class="relative w-full h-full">
    {#if !isCropActive}
        <img
            src={illustration}
            alt="Card Illustration"
            class="h-full w-full object-cover {imageShape == 'rect'
                ? ''
                : 'rounded-full'}"
        />
        {#if isEditable}
            <input
                type="file"
                accept="image/*"
                onchange={handleImageChange}
                class="absolute inset-0 opacity-0 cursor-pointer"
            />
        {/if}
    {:else}
        <div class="absolute bottom-2 right-2 flex space-x-2 z-10">
            <button onclick={onCropComplete} class="rounded-full opacity-100"
                ><CheckCircleOutline class="text-green-600" /></button
            >
            <button onclick={cancelCrop} class="rounded-full opacity-100"
                ><CloseCircleOutline class="text-red-600" /></button
            >
        </div>
        <Cropper
            image={tmpIllustration}
            crop={{ x: 0, y: 0 }}
            {cropSize}
            zoom={1}
            minZoom={0.1}
            zoomSpeed={0.1}
            restrictPosition={false}
            oncropcomplete={(e) => (cropArea = e)}
            cropShape={imageShape}
        />
    {/if}
</div>
