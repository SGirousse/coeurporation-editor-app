import { type CardType, ResourceCardType, CodirEventCardType, ActionCardType, ProjectCardType, ClientType } from "$lib/index.js";

const GAME_JSON_DATA = "data";
const GAME_JSON_DATA_CARD_RESOURCES = "resources";
const GAME_JSON_DATA_CARD_CODIREVENTS = "codirEvents";
const GAME_JSON_DATA_CARD_ACTIONS = "actions";
const GAME_JSON_DATA_CARD_PROJECTS = "projects";
const GAME_JSON_DATA_INFO_CLIENTS = "clients";
const GAME_JSON_META = "meta";
const GAME_JSON_META_VERSION = "version";

const CURRENT_VERSION = "0.1";

async function convertImageToBase64(imageUrl: string): Promise<string> {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = (error) => {
                console.error("Failed to convert image to base64:", error);
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Failed to fetch image:", error);
        throw error;
    }
}

async function elementIllustrationToBase64Images(elementsithIllustration: (CardType | ClientType)[] = []): Promise<(CardType | ClientType)[]> {
    const elementsWithBase64Images = await Promise.all(
        elementsithIllustration.map(async (elementWithIllustration) => {
            if (
                elementWithIllustration.illustration &&
                !elementWithIllustration.illustration.startsWith("data:")
            ) {
                elementWithIllustration.illustration = await convertImageToBase64(
                    elementWithIllustration.illustration,
                );
            }
            return elementWithIllustration;
        }),
    );

    return elementsWithBase64Images;
}

export async function writeFileContent(resourceCards: ResourceCardType[], codirEventCards: CodirEventCardType[], actionCards: ActionCardType[], projectCards: ProjectCardType[], clients: ClientType[]) {

    let meta = {
        [GAME_JSON_META_VERSION]: CURRENT_VERSION
    };

    const resourceCardsWithBase64Images = await elementIllustrationToBase64Images(resourceCards);
    const codirEventCardsWithBase64Images = await elementIllustrationToBase64Images(codirEventCards);
    const actionCardsWithBase64Images = await elementIllustrationToBase64Images(actionCards);
    const clientsWithBase64Images = await elementIllustrationToBase64Images(clients);

    let data = {
        [GAME_JSON_DATA_CARD_RESOURCES]: resourceCardsWithBase64Images,
        [GAME_JSON_DATA_CARD_CODIREVENTS]: codirEventCardsWithBase64Images,
        [GAME_JSON_DATA_CARD_ACTIONS]: actionCardsWithBase64Images,
        [GAME_JSON_DATA_CARD_PROJECTS]: projectCards,
        [GAME_JSON_DATA_INFO_CLIENTS]: clientsWithBase64Images,
    };

    let jsonified = {
        [GAME_JSON_META]: meta,
        [GAME_JSON_DATA]: data
    };

    const json = JSON.stringify(jsonified, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cards-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export async function readFileContent(files: FileList): Promise<{ resourceCards: ResourceCardType[], codirEventCards: CodirEventCardType[], actionCards: ActionCardType[], projectCards: ProjectCardType[], clients: ClientType[] }> {
    let resourceCards: ResourceCardType[] = [];
    let codirEventCards: CodirEventCardType[] = [];
    let actionCards: ActionCardType[] = [];
    let projectCards: ProjectCardType[] = [];
    let clients: ClientType[] = [];

    for (const file of files) {
        const reader = new FileReader();
        const fileContent = await new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });

        const gameContent = JSON.parse(fileContent);

        const gameData = gameContent[GAME_JSON_DATA];
        const meta = gameContent[GAME_JSON_META];

        if (meta[GAME_JSON_META_VERSION] !== CURRENT_VERSION) {
            throw new Error(`${meta[GAME_JSON_META_VERSION]} is not supported`);
        }

        if (GAME_JSON_DATA_CARD_RESOURCES in gameData) {
            for (const card of gameData[GAME_JSON_DATA_CARD_RESOURCES]) {
                resourceCards.push(new ResourceCardType({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                    grade: card.grade,
                    burnoutPoints: card.burnoutPoints,
                    cost: card.cost,
                }));
            }
        }
        if (GAME_JSON_DATA_CARD_CODIREVENTS in gameData) {
            for (const card of gameData[GAME_JSON_DATA_CARD_CODIREVENTS]) {
                codirEventCards.push(new CodirEventCardType({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                }));
            }
        }
        if (GAME_JSON_DATA_CARD_ACTIONS in gameData) {
            for (const card of gameData[GAME_JSON_DATA_CARD_ACTIONS]) {
                actionCards.push(new ActionCardType({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                }));
            }
        }
        if (GAME_JSON_DATA_CARD_PROJECTS in gameData) {
            for (const card of gameData[GAME_JSON_DATA_CARD_PROJECTS]) {
                projectCards.push(new ProjectCardType({
                    title: card.title,
                    illustration: card.illustration,
                    lore: card.lore,
                    effect: card.effect,
                    client: card.client,
                    optimalRevenue: card.optimalRevenue,
                    baseRevenue: card.baseRevenue,
                    optimalStaffing: card.optimalStaffing,
                    penaltyThreshold: card.penaltyThreshold,
                    penaltyEffect: card.penaltyEffect,
                    reputation: card.reputation
                }));
            }
        }
        if (GAME_JSON_DATA_INFO_CLIENTS in gameData) {
            for (const client of gameData[GAME_JSON_DATA_INFO_CLIENTS]) {
                clients.push(new ClientType({
                    id: client.id,
                    name: client.name,
                    illustration: client.illustration,
                    comboThreshold: client.comboThreshold,
                    comboEffect: client.comboEffect,
                }));
            }
        }
    }

    return { resourceCards, codirEventCards, actionCards, projectCards, clients };
}
