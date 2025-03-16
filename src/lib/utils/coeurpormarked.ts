import { marked } from "marked";
import { grades, type CardType, type ClientType } from "$lib";

const ICON_BATTERY = `<svg class="w-4 h-4 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 13v-2h7v2H7Z"/>
                            <path fill-rule="evenodd" d="M2 8a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8Zm4 1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H6Z" clip-rule="evenodd"/>
                            <path d="M22 14v-4a1 1 0 0 0-1-1h-1v6h1a1 1 0 0 0 1-1Z"/>
                            </svg>`;


const ICON_HAPPYNESS = `<svg class="w-4 h-4 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z"/>
                        </svg>`;

const ICON_AWARD = `<svg class="w-4 h-4 inline-block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                    </svg>`

const COLOR_CLASS_NEGATIVE = "text-red-600";
const COLOR_CLASS_POSITIVE = "text-green-600";

const MSG_WRONG_ATTRIBUTE = "<div class='bg-red-500'>Cette variable n'est pas supportée.</div>"

/**
     * Interprets the markdown to some html and then replaces some variables with the game informatons.
     *
     * Supported variables ATM :
     * - `%cardTitle%`  : `card.title`
     * - `%cardGrade%`  : `card.grade` (only Ressource Cards)
     * - `%cardBP%`     : `card.burnoutPoints`<batteryIcon> (only Ressource Cards)
     * - `%cardCost%`   : `card.cost`k€ (only Ressource Cards)
     * - `%cardBR%`     : `card.baseRevenue`k€ (only Project Cards)
     * - `%cardOR%`     : `card.optimalRevenue`k€ (only Project Cards)
     * - `%cardRep%`    : `card.reputation`<reputationIcon> (only Project Cards)
     * - `%cardPenT%`   : `card.penaltyThreshold` (only Project Cards)
     * - `%cardClient%` : `card.client` (only Project Cards)
     * 
     * Supported calculated variables :
     * - `%bp<sign>x%`       : write <sign>x<batteryIcon>
     * - `%k<sign>x%`        : write <sign>xk€
     * - `%happy<sign>x%`    : write <sign>x<happynessIcon>
     * - `%rep<sign>x%`      : write <sign>x<reputationIcon>
     * - `%grade<value>%`    : write <value> in the grade formatting
     *
     * @param rawText html text to be transformed.
     * @param card card data to be used for data extraction.
     */
export async function coeurpormarked(rawText: string, card: CardType, clients: ClientType[] = []): Promise<string> {
    console.log(clients)
    const markedText = await marked(rawText);

    let coeurpormarkedText = markedText
        .replaceAll("%cardTitle%", card.title || "")
        .replaceAll(
            "%cardGrade%",
            "grade" in card ? replaceGrade(card.grade as string) : ""
        )
        .replaceAll("%cardBP%", "burnoutPoints" in card ? `${card.burnoutPoints}${ICON_BATTERY}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardCost%", "cost" in card ? `${card.cost}k€` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardBR%", "baseRevenue" in card ? `${card.baseRevenue}k€` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardOR%", "optimalRevenue" in card ? `${card.optimalRevenue}k€` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardRep%", "reputation" in card ? `${card.reputation}${ICON_AWARD}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardPenT%", "penaltyThreshold" in card ? `${card.penaltyThreshold}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardClient%", "client" in card ? `${clients.find((client) => client.id === card.client)?.name || ""}` : MSG_WRONG_ATTRIBUTE)

    coeurpormarkedText = coeurpormarkedText.replace(new RegExp(`%grade([A-Z]+)%`, "gi"), (match, p1) => {
        return replaceGrade(p1)
    });

    coeurpormarkedText = replaceVariable(coeurpormarkedText, "bp", ICON_BATTERY);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "happy", ICON_HAPPYNESS);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "k", "k€");
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "rep", ICON_AWARD);

    return coeurpormarkedText;
}

function replaceGrade(gradeValue: string): string {
    return `<span class="inline-block ${grades.find((gradeItem) => gradeItem.value === gradeValue)?.color} compact-select flex h-4 w-4 rounded-full text-white text-center focus:outline-none p-0 m-0">${gradeValue}</span>`;
}

function replaceVariable(text: string, variable: string, icon: string): string {

    text = text.replace(new RegExp(`%${variable}-(\\d+)%`, "g"), (_, p1) => {
        return `<span class="${variable == "bp" ? COLOR_CLASS_POSITIVE : COLOR_CLASS_NEGATIVE}">-${p1}&nbsp;${icon}</span>`;
    });

    text = text.replace(new RegExp(`%${variable}[+](\\d+)%`, "g"), (_, p1) => {
        return `<span class="${variable == "bp" ? COLOR_CLASS_NEGATIVE : COLOR_CLASS_POSITIVE}">+${p1}&nbsp;${icon}</span>`;
    });

    text = text.replace(new RegExp(`%${variable}[_](\\d+)%`, "g"), (_, p1) => {
        return `<span>${p1}&nbsp;${icon}</span>`;
    });

    return text;
}
