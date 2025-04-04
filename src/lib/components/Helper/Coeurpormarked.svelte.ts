import { marked } from "marked";
import { grades, cardTypeIcons, type CardType } from "$lib/components/Cards/CardType.svelte";
import { clients } from "$lib/components/GameManager.svelte";
import { getIconValue, ICON_BATTERY, ICON_HAPPYNESS, ICON_AWARD, ICON_KEURO, ICON_BASE, ICON_PLUS, ICON_MINUS, ICON_CARD_ACTION, ICON_CARD_EVENT, ICON_CARD_PROJECT, ICON_CARD_RSC, ICON_EFFECT_ONSTAFFING, ICON_EFFECT_PERMANENT } from "../Helper/IconManager.svelte";


const COLOR_CLASS_NEGATIVE = "text-red-600";
const COLOR_CLASS_POSITIVE = "text-green-600";

const MSG_WRONG_ATTRIBUTE = "<div class='bg-red-500'>Cette variable n'est pas supportée.</div>"

/**
     * Interprets the markdown to some html and then replaces some variables with the game informatons.
     *
     * Supported variables ATM :
     * - `%cardTitle%`      : `card.title`
     * - `%cardGrade%`      : `card.grade` (only Ressource Cards)
     * - `%cardBP%`         : `card.burnoutPoints`<batteryIcon> (only Ressource Cards)
     * - `%cardCost%`       : `card.cost`k€ (only Ressource Cards)
     * - `%cardBR%`         : `card.baseRevenue`k€ (only Project Cards)
     * - `%cardOR%`         : `card.optimalRevenue`k€ (only Project Cards)
     * - `%cardRep%`        : `card.reputation`<reputationIcon> (only Project Cards)
     * - `%cardPenT%`       : `card.penaltyThreshold` (only Project Cards)
     * - `%cardClient%`     : `card.client` (only Project Cards)
     * - `%cardType%`       : Icon of the card.
     * - `%cardResource%`   : Resource card icon.
     * - `%cardAction%`     : Action card icon.
     * - `%cardEvent%`      : Event card icon.
     * - `%cardProject%`    : Project card icon.
     * - `%cardEffPerm%`    : Permanent effect icon.
     * - `%cardEffOnStaff%` : On staffing effect icon.
     * 
     * Supported calculated variables :
     * - `%bp<sign>x%`          : write <sign>x<batteryIcon>
     * - `%k<sign>x%`           : write <sign>xk€
     * - `%happy<sign>x%`       : write <sign>x<happynessIcon>
     * - `%rep<sign>x%`         : write <sign>x<reputationIcon>
     * - `%grade<value>%`       : write <value> in the grade formatting
     * - `%cardResource<sign>x%`: write <sign>x<cardSymbol> 
     * - `%cardAction<sign>x%`  : write <sign>x<cardSymbol>
     * - `%cardEvent<sign>x%`   : write <sign>x<cardSymbol>
     * - `%cardProject<sign>x%` : write <sign>x<cardSymbol>
     *
     * @param rawText html text to be transformed.
     * @param card card data to be used for data extraction.
     */
export async function coeurpormarked(rawText: string = "", card: CardType): Promise<string> {
    const markedText = await marked(rawText);

    let coeurpormarkedText = markedText
        .replaceAll("%cardTitle%", card.title || "")
        .replaceAll(
            "%cardGrade%",
            "grade" in card ? replaceGrade(card.grade as string) : ""
        )
        .replaceAll("%cardBP%", "burnoutPoints" in card ? `${card.burnoutPoints}${getIconValue(ICON_BATTERY, ICON_BASE)}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardCost%", "cost" in card ? `${card.cost}${getIconValue(ICON_KEURO, ICON_BASE)}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardBR%", "baseRevenue" in card ? `${card.baseRevenue}${getIconValue(ICON_KEURO, ICON_BASE)}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardOR%", "optimalRevenue" in card ? `${card.optimalRevenue}${getIconValue(ICON_KEURO, ICON_BASE)}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardRep%", "reputation" in card ? `${card.reputation}${getIconValue(ICON_AWARD, ICON_BASE)}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardPenT%", "penaltyThreshold" in card ? `${card.penaltyThreshold}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardClient%", "client" in card ? `${clients.clients.find((client) => client.id === card.client)?.name || ""}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardType%", getIconValue(cardTypeIcons[card.cardType]))
        .replaceAll("%cardResource%", getIconValue(ICON_CARD_RSC))
        .replaceAll("%cardAction%", getIconValue(ICON_CARD_ACTION))
        .replaceAll("%cardEvent%", getIconValue(ICON_CARD_EVENT))
        .replaceAll("%cardProject%", getIconValue(ICON_CARD_PROJECT))
        .replaceAll("%cardEffPerm%", getIconValue(ICON_EFFECT_PERMANENT))
        .replaceAll("%cardEffOnStaff%", getIconValue(ICON_EFFECT_ONSTAFFING))

    coeurpormarkedText = coeurpormarkedText.replace(new RegExp(`%grade([A-Z]+)%`, "gi"), (match, p1) => {
        return replaceGrade(p1)
    });

    coeurpormarkedText = replaceVariable(coeurpormarkedText, "bp", ICON_BATTERY);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "happy", ICON_HAPPYNESS);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "k", ICON_KEURO);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "rep", ICON_AWARD);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "cardResource", ICON_CARD_RSC);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "cardAction", ICON_CARD_ACTION);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "cardEvent", ICON_CARD_EVENT);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "cardProject", ICON_CARD_PROJECT);

    return coeurpormarkedText;
}

function replaceGrade(gradeValue: string): string {
    return `<span class="inline-block ${grades.find((gradeItem) => gradeItem.value === gradeValue)?.color} compact-select flex h-4 w-4 rounded-full text-white text-center focus:outline-none p-0 m-0">${gradeValue}</span>`;
}

function replaceVariable(text: string, variable: string, icon: any): string {

    if (variable == "bp") {
        text = text.replace(new RegExp(`%${variable}-(\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_POSITIVE}">${p1}${getIconValue(icon, ICON_PLUS)}</span>`;
        });

        text = text.replace(new RegExp(`%${variable}[+](\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_NEGATIVE}">${p1}${getIconValue(icon, ICON_MINUS)}</span>`;
        });

    } else {
        text = text.replace(new RegExp(`%${variable}-(\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_NEGATIVE}">${p1}${getIconValue(icon, ICON_MINUS)}</span>`;
        });

        text = text.replace(new RegExp(`%${variable}[+](\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_POSITIVE}">${p1}${getIconValue(icon, ICON_PLUS)}</span>`;
        });
    }

    text = text.replace(new RegExp(`%${variable}[_](\\d+)%`, "g"), (_, p1) => {
        return `<span>${p1}${getIconValue(icon)}</span>`;
    });

    return text;
}
