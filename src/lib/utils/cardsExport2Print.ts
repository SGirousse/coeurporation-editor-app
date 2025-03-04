
import type { CardType } from "$lib";
import { toPng } from "html-to-image";
import JSZip from "jszip";

/**
 * Create a temporary dom element which will contains all a copy of cards.
 * 
 * @param pageNb Used for the div id.
 * @returns A preformatted div representing an A4 file.
 */
function newPageElement(pageNb: number): HTMLDivElement {
    const pageElement = document.createElement("div");
    pageElement.id = `printPage-${pageNb}`;
    pageElement.className =
        "flex flex-wrap h-[297mm] w-[210mm] p-2 bg-white items-center justify-center";
    document.body.appendChild(pageElement);

    return pageElement;
}

async function appendPageToZip(zip: JSZip, pageElement: HTMLDivElement, pageNb: number) {
    const dataUrl = await toPng(pageElement);
    const base64Data = dataUrl.split(',')[1];
    console.log(zip)
    zip.file(`page_${pageNb}.png`, base64Data, { base64: true });
    console.log(zip)
    document.body.removeChild(pageElement);
}

/**
 * Add all cards to page (png) and all the pages to a zip file.
 * 
 * @param zip Zip to populate.
 * @param cards List of cards to print and zip.
 * @param cardsPerPage Number of cards to be printed on each page. 6 for classic cards and 9 for landscape tarot cards.
 * @param pageNb Page number. Is by default 0 but to be incremented if the function called several times on the same zip.
 * @returns Incremented value of page number.
 */
async function appendCardsPagesToZip(zip: JSZip, cards: CardType[], cardsPerPage: number, pageNb: number = 0): Promise<number> {
    let cardCount = 0

    let pageElement = newPageElement(pageNb);
    for (const card of cards) {
        console.log(card.title)
        if (cardCount > 0 && cardCount % cardsPerPage === 0) {
            await appendPageToZip(zip, pageElement, pageNb);
            pageNb++;
            pageElement = newPageElement(pageNb);
        }

        const cardElement = document.getElementById(`card-${card.id}`);
        if (cardElement) {
            const cardClone = cardElement.cloneNode(true);
            pageElement.appendChild(cardClone);
            cardCount++;
        }
    }

    // do not generate a final empty page
    if (cardCount % cardsPerPage !== 0) {
        await appendPageToZip(zip, pageElement, pageNb);
        pageNb++;
    }

    return pageNb;
}

export async function cardsToPngsZipped(baseCards: CardType[], projectCards: CardType[]) {

    const zip = new JSZip();

    let pageNb = await appendCardsPagesToZip(zip, baseCards, 9)
    await appendCardsPagesToZip(zip, projectCards, 4, pageNb)

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "cards.zip";
    link.click();
}