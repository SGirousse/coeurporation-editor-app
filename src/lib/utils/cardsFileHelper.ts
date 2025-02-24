import type { CardType, ResourceCardType, CodirEventCardType, ActionCardType, ProjectCardType } from "$lib/index.ts";

const CARD_JSON_DATA = "data"
const CARD_JSON_DATA_CARD_RESOURCES = "resources"
const CARD_JSON_DATA_CARD_CODIREVENTS = "codirEvents"
const CARD_JSON_DATA_CARD_ACTIONS = "actions"
const CARD_JSON_DATA_CARD_PROJECTS = "projects"
const CARD_JSON_META = "meta"
const CARD_JSON_META_VERSION = "version"

const CURRENT_VERSION = "0.1"

async function convertImageToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (reader.result) {
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }
    });
}

async function cardIllustrationToBase64Images(cardsWithIllustration: CardType[] = []): Promise<CardType[]> {
    const cardsWithBase64Images = await Promise.all(
        cardsWithIllustration.map(async (cardWithIllustration) => {
            if (
                cardWithIllustration.illustration &&
                !cardWithIllustration.illustration.startsWith("data:")
            ) {
                cardWithIllustration.illustration = await convertImageToBase64(
                    cardWithIllustration.illustration,
                );
            }
            return cardWithIllustration;
        }),
    );

    return cardsWithBase64Images
}

export async function writeFileContent(resourceCards: ResourceCardType[], codirEventCards: CodirEventCardType[], actionCards: ActionCardType[], projectCards: ProjectCardType[]) {

    let meta = {
        [CARD_JSON_META_VERSION]: CURRENT_VERSION
    }

    const resourceCardsWithBase64Images = await cardIllustrationToBase64Images(resourceCards);
    const codirEventCardsWithBase64Images = await cardIllustrationToBase64Images(codirEventCards);
    const actionCardsWithBase64Images = await cardIllustrationToBase64Images(actionCards);
    const projectCardsWithBase64Images = await cardIllustrationToBase64Images(projectCards);

    let data = {
        [CARD_JSON_DATA_CARD_RESOURCES]: resourceCardsWithBase64Images,
        [CARD_JSON_DATA_CARD_CODIREVENTS]: codirEventCardsWithBase64Images,
        [CARD_JSON_DATA_CARD_ACTIONS]: actionCardsWithBase64Images,
        [CARD_JSON_DATA_CARD_PROJECTS]: projectCardsWithBase64Images,
    }

    let jsonified = {
        [CARD_JSON_META]: meta,
        [CARD_JSON_DATA]: data
    }

    const json = JSON.stringify(jsonified, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cards-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export async function readFileContent(files: FileList): Promise<{ resourceCards: ResourceCardType[], codirEventCards: CodirEventCardType[], actionCards: ActionCardType[], projectCards: ProjectCardType[] }> {
    let resourceCards: ResourceCardType[] = [];
    let codirEventCards: CodirEventCardType[] = [];
    let actionCards: ActionCardType[] = [];
    let projectCards: ProjectCardType[] = [];

    for (const file of files) {
        const reader = new FileReader();
        const fileContent = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });

        const cardsData = JSON.parse(fileContent);

        const cards = cardsData[CARD_JSON_DATA];
        const meta = cardsData[CARD_JSON_META];

        if (meta[CARD_JSON_META_VERSION] !== CURRENT_VERSION) {
            throw new Error(`${meta[CARD_JSON_META_VERSION]} is not supported`)
        }


        if (CARD_JSON_DATA_CARD_RESOURCES in cards) {
            for (const card of cards[CARD_JSON_DATA_CARD_RESOURCES]) {
                resourceCards.push({
                    title: card.title,
                    grade: card.grade,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                    burnoutPoints: card.burnoutPoints,
                    cost: card.cost,
                });
            }
        }
        if (CARD_JSON_DATA_CARD_CODIREVENTS in cards) {
            for (const card of cards[CARD_JSON_DATA_CARD_CODIREVENTS]) {
                codirEventCards.push({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                });
            }
        }
        if (CARD_JSON_DATA_CARD_ACTIONS in cards) {
            for (const card of cards[CARD_JSON_DATA_CARD_ACTIONS]) {
                actionCards.push({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                });
            }
        }
        if (CARD_JSON_DATA_CARD_PROJECTS in cards) {
            for (const card of cards[CARD_JSON_DATA_CARD_PROJECTS]) {
                projectCards.push({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                    client: card.client,
                    optimalRevenue: card.optimalRevenue,
                    baseRevenue: card.baseRevenue,
                    comboClientThreshold: card.comboClientThreshold,
                    comboClientEffect: card.comboClientEffect,
                    optimalStaffing: card.optimalStaffing,
                    penaltyThreshold: card.penaltyThreshold,
                    penaltyEffect: card.penaltyEffect,
                });
            }
        }
    }

    return { resourceCards, codirEventCards, actionCards, projectCards };
}
