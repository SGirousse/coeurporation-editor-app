import {
    ResourceCardType,
    CodirEventCardType,
    ActionCardType,
    ProjectCardType,
    ClientType,
} from "$lib/index";
import {
    readFileContent,
} from "$lib/utils/cardsFileHelper";
import defaultIllustration from "$lib/assets/illustration/default.jpg";

import { v4 as uuidv4 } from 'uuid';
export let resourceCards = $state<{ cards: ResourceCardType[] }>({ cards: [] });
export let codirEventCards = $state<{ cards: CodirEventCardType[] }>({ cards: [] });
export let actionCards = $state<{ cards: ActionCardType[] }>({ cards: [] });
export let projectCards = $state<{ cards: ProjectCardType[] }>({ cards: [] });
export let clients = $state<{ clients: ClientType[] }>({ clients: [] });

export async function loadFromFile(files: any) {
    await readFileContent(files).then(
        ({
            resourceCards: newResourceCards,
            codirEventCards: newCodirEventCards,
            actionCards: newActionCards,
            projectCards: newProjectCards,
            clients: newClients,
        }) => {
            resourceCards.cards = newResourceCards;
            codirEventCards.cards = newCodirEventCards;
            actionCards.cards = newActionCards;
            projectCards.cards = newProjectCards;
            clients.clients = newClients;
        },
    );
    files = undefined;
}

export function newCard(type: any) {
    let card: any = { id: uuidv4(), title: "test", illustration: defaultIllustration, lore: "Lore", effect: "" };

    if (type == ResourceCardType) {
        card.cardType = "ResourceCardType"
        card.grade = "A";
        card.burnoutPoints = 3;
        card.cost = 25;
    } else if (type == CodirEventCardType) {
        card.cardType = "CodirEventCardType"
        // no additional property
    } else if (type == ActionCardType) {
        card.cardType = "ActionCardType"
        // no additional property
    } else if (type == ProjectCardType) {
        card.cardType = "ProjectCardType"
        card.client = "001";
        card.optimalRevenue = 20;
        card.baseRevenue = 10;
        card.reputation = 1;
        card.optimalStaffing = ["A", "B", "", "", "", ""];
        card.penaltyThreshold = 3;
        card.penaltyEffect = "";
    } else {
        throw new Error(`${type} is not a valid card type.`);
    }

    return card
}
