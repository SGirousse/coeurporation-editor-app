
import {
    ProjectCardType,
    ResourceCardType,
    CodirEventCardType,
    ActionCardType,
} from "$lib/index.js";


import { v4 as uuidv4 } from 'uuid';

export function newCard(type: any) {
    let card: any = { id: uuidv4(), title: "test", illustration: "", lore: "Lore", effect: "" };

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