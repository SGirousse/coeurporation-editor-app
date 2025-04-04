import { marked } from "marked";
import { grades, type CardType } from "$lib/components/Cards/CardType.svelte";
import { clients } from "$lib/components/GameManager.svelte";

const ICON_BASE = "base";
const ICON_PLUS = "plus";
const ICON_MINUS = "minus";

const ICON_BATTERY = {
    [ICON_BASE]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22zm1-2h6V6H9z"/></svg>`,
    [ICON_PLUS]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7.7q-.55.15-1.05.388t-.95.562V6H9v14h3.7q.125.55.363 1.05t.562.95zm8.4 0L15 20.6l2.1-2.1l-2.1-2.1l1.4-1.4l2.1 2.1l2.1-2.1l1.4 1.4l-2.075 2.1L22 20.6L20.6 22l-2.1-2.075z"/></svg>`,
    [ICON_MINUS]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925zm8 0v-3h-3v-2h3v-3h2v3h3v2h-3v3z"/></svg>`,
};

const ICON_HAPPYNESS = {
    [ICON_BASE]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></g></svg>`,
    [ICON_PLUS]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.985 12.528a9 9 0 1 0-8.45 8.456M16 19h6m-3-3v6M9 10h.01M15 10h.01"/><path d="M9.5 15c.658.64 1.56 1 2.5 1s1.842-.36 2.5-1"/></g></svg>`,
    [ICON_MINUS]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20.48 15.014a9 9 0 1 0-7.956 5.97M9 10h.01M15 10h.01m.99 9h6"/><path d="M9.5 15c.658.64 1.56 1 2.5 1s1.842-.36 2.5-1"/></g></svg>`,
}

const ICON_AWARD = {
    [ICON_BASE]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 9a6 6 0 1 0 12 0A6 6 0 1 0 6 9"/><path d="m12 15l3.4 5.89l1.598-3.233l3.598.232l-3.4-5.889M6.802 12l-3.4 5.89L7 17.657l1.598 3.232l3.4-5.889"/></g></svg>`,
    [ICON_PLUS]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 9a6 6 0 1 0 12 0A6 6 0 1 0 6 9"/><path d="m12 15l3.4 5.89l1.598-3.233l3.598.232l-3.4-5.889M6.802 12l-3.4 5.89L7 17.657l1.598 3.232l3.4-5.889"/></g></svg>`,
    [ICON_MINUS]: `<svg class="w-4 h-4 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16.72 12.704a6 6 0 0 0-8.433-8.418m-1.755 2.24a6 6 0 0 0 7.936 7.944"/><path d="m12 15l3.4 5.89l1.598-3.233l.707.046m1.108-2.902l-1.617-2.8M6.802 12l-3.4 5.89L7 17.657l1.598 3.232l3.4-5.889M3 3l18 18"/></g></svg>`,
}

const ICON_KEURO = {
    [ICON_BASE]: "k€",
    [ICON_PLUS]: "k€",
    [ICON_MINUS]: "k€",
}

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
     * - `%bp<sign>x%`          : write <sign>x<batteryIcon>
     * - `%k<sign>x%`           : write <sign>xk€
     * - `%happy<sign>x%`       : write <sign>x<happynessIcon>
     * - `%rep<sign>x%`         : write <sign>x<reputationIcon>
     * - `%grade<value>%`       : write <value> in the grade formatting
     * - `%cardResource<sign>x%`
     * - `%cardAction<sign>x%`
     * - `%cardEvent<sign>x%`
     * - `%cardProject<sign>x%`
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
        .replaceAll("%cardBP%", "burnoutPoints" in card ? `${card.burnoutPoints}${ICON_BATTERY[ICON_BASE]}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardCost%", "cost" in card ? `${card.cost}${ICON_KEURO[ICON_BASE]}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardBR%", "baseRevenue" in card ? `${card.baseRevenue}${ICON_KEURO[ICON_BASE]}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardOR%", "optimalRevenue" in card ? `${card.optimalRevenue}${ICON_KEURO[ICON_BASE]}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardRep%", "reputation" in card ? `${card.reputation}${ICON_AWARD[ICON_BASE]}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardPenT%", "penaltyThreshold" in card ? `${card.penaltyThreshold}` : MSG_WRONG_ATTRIBUTE)
        .replaceAll("%cardClient%", "client" in card ? `${clients.clients.find((client) => client.id === card.client)?.name || ""}` : MSG_WRONG_ATTRIBUTE)

    coeurpormarkedText = coeurpormarkedText.replace(new RegExp(`%grade([A-Z]+)%`, "gi"), (match, p1) => {
        return replaceGrade(p1)
    });

    coeurpormarkedText = replaceVariable(coeurpormarkedText, "bp", ICON_BATTERY);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "happy", ICON_HAPPYNESS);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "k", ICON_KEURO);
    coeurpormarkedText = replaceVariable(coeurpormarkedText, "rep", ICON_AWARD);

    return coeurpormarkedText;
}

function replaceGrade(gradeValue: string): string {
    return `<span class="inline-block ${grades.find((gradeItem) => gradeItem.value === gradeValue)?.color} compact-select flex h-4 w-4 rounded-full text-white text-center focus:outline-none p-0 m-0">${gradeValue}</span>`;
}

function replaceVariable(text: string, variable: string, icon: any): string {

    if (variable == "bp") {
        text = text.replace(new RegExp(`%${variable}-(\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_POSITIVE}">${p1}${icon[ICON_PLUS]}</span>`;
        });

        text = text.replace(new RegExp(`%${variable}[+](\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_NEGATIVE}">${p1}${icon[ICON_MINUS]}</span>`;
        });

    } else {
        text = text.replace(new RegExp(`%${variable}-(\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_NEGATIVE}">${p1}${icon[ICON_MINUS]}</span>`;
        });

        text = text.replace(new RegExp(`%${variable}[+](\\d+)%`, "g"), (_, p1) => {
            return `<span class="${COLOR_CLASS_POSITIVE}">${p1}${icon[ICON_PLUS]}</span>`;
        });
    }

    text = text.replace(new RegExp(`%${variable}[_](\\d+)%`, "g"), (_, p1) => {
        return `<span>${p1}${icon[ICON_BASE]}</span>`;
    });

    return text;
}
