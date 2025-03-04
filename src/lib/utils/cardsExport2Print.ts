
import type { CardType } from "$lib";
import { toPng } from "html-to-image";
import JSZip from "jszip";

function newPageElement(pageNb: number): HTMLDivElement {
    const pageElement = document.createElement("div");
    pageElement.id = `printPage-${pageNb}`;
    pageElement.className =
        "flex flex-wrap h-[297mm] w-[210mm] p-2 bg-white items-center justify-center";
    return pageElement;
}

function appendCardsToPages(pages: HTMLDivElement[], cards: CardType[], cardsPerPage: number) {
    let pageNb = pages.length
    let cardCount = 0

    for (const card of cards) {
        if (cardCount % cardsPerPage == 0) {
            pageNb++;
            pages.push(newPageElement(pageNb));
            document.body.appendChild(pages[pageNb - 1]);
        }

        const cardElement = document.getElementById(`card-${card.id}`);
        if (cardElement) {
            const cardClone = cardElement.cloneNode(true);
            pages[pageNb - 1].appendChild(cardClone);
            cardCount++;
        }
    }

}

export async function cardsToPngsZipped(baseCards: CardType[], projectCards: CardType[]) {
    let pages: HTMLDivElement[] = [];

    appendCardsToPages(pages, baseCards, 9)
    appendCardsToPages(pages, projectCards, 4)

    const zip = new JSZip();

    for (const pageElement of pages) {
        const dataUrl = await toPng(pageElement);
        const base64Data = dataUrl.split(',')[1];
        zip.file(`page_${pages.indexOf(pageElement) + 1}.png`, base64Data, { base64: true });
        document.body.removeChild(pageElement);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "cards.zip";
    link.click();
}