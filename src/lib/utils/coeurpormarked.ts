import { marked } from "marked";
import { grades, clients, type CardType } from "$lib";

const ICON_BATTERY = `<svg class="w-4 h-4 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 13v-2h7v2H7Z"/>
                            <path fill-rule="evenodd" d="M2 8a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Zm4 1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H6Z" clip-rule="evenodd"/>
                            <path d="M22 14v-4a1 1 0 0 0-1-1h-1v6h1a1 1 0 0 0 1-1Z"/>
                            </svg>`;


const ICON_HAPPYNESS = `<svg class="w-4 h-4 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.99 9H15M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7 13c0 1 .507 2.397 1.494 3.216a5.5 5.5 0 0 0 7.022 0C16.503 15.397 17 14 17 13c0 0-1.99 1-4.995 1S7 13 7 13Z"/>
                        </svg>`

/**
     * Interprets the markdown to some html and then replaces some variables with the game informatons.
     *
     * Supported variables ATM :
     * - `%cardTitle%`  : `card.title`
     * - `%cardGrade%`  : `card.grade` (only Ressource Cards)
     * - `%cardBP%`     : `card.burnoutPoints`<batteryIcon> (only Ressource Cards)
     * - `%cardCost%`   : `card.cost`k€ (only Ressource Cards)
     * - `%cardClient%` : `card.client` (only Project Cards)
     * 
     * Supported calculated variables :
     * - `%bp<sign>x%`       : write <sign>x<batteryIcon>
     * - `%k<sign>x%`        : write <sign>xk€
     * - `%happy<sign>x%`    : write <sign>x<happynessIcon>
     *
     * @param rawText html text to be transformed.
     * @param card card data to be used for data extraction.
     */
export async function coeurpormarked(rawText: string, card: CardType): Promise<string> {
    const markedText = await marked(rawText);

    let coeurpormarkedText = markedText
        .replaceAll("%cardTitle%", card.title)
        .replaceAll(
            "%cardGrade%",
            `<span class="inline-block ${grades.find((gradeItem) => gradeItem.value === card.grade)?.color} compact-select flex h-4 w-4 rounded-full text-white text-center focus:outline-none p-0 m-0">${card.grade}</span>`,
        )
        .replaceAll("%cardBP%", `${card.burnoutPoints}${ICON_BATTERY}`)
        .replaceAll("%cardCost%", `${card.cost}k€`)
        .replaceAll("%cardClient%", `${clients.find((client) => client.id === card.client)?.name}`);

    coeurpormarkedText = coeurpormarkedText.replace(/%bp-(\d+)%/g, (match, p1) => {
        return `<span class="text-green-600">-${p1}&nbsp;${ICON_BATTERY}</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%bp[+](\d+)%/g, (match, p1) => {
        return `<span class="text-red-600">+${p1}&nbsp;${ICON_BATTERY}</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%bp[_](\d+)%/g, (match, p1) => {
        return `<span>${p1}&nbsp;${ICON_BATTERY}</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%happy-(\d+)%/g, (match, p1) => {
        return `<span class="text-red-600">-${p1}&nbsp;${ICON_HAPPYNESS}</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%happy[+](\d+)%/g, (match, p1) => {
        return `<span class="text-green-600">+${p1}&nbsp;${ICON_HAPPYNESS}</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%happy[_](\d+)%/g, (match, p1) => {
        return `<span>${p1}&nbsp;${ICON_HAPPYNESS}</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%k-(\d+)%/g, (match, p1) => {
        return `<span class="text-red-600">${p1}k€</span>`;
    });

    coeurpormarkedText = coeurpormarkedText.replace(/%k[+](\d+)%/g, (match, p1) => {
        return `<span class="text-green-600">${p1}k€</span>`;
    });

    return coeurpormarkedText;
}
