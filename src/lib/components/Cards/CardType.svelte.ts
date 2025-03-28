import defaultIllustration from "$lib/assets/illustration/default.jpg";
import { v4 as uuidv4 } from 'uuid';

// UTILITY CONSTANTS
// - GLOBAL
export const CARD_TYPE_NAME_RESOURCE: string = "ResourceCardType";
export const CARD_TYPE_NAME_EVENT: string = "CodirEventCardType";
export const CARD_TYPE_NAME_ACTION: string = "ActionCardType";
export const CARD_TYPE_NAME_PROJECT: string = "ProjectCardType";
// - ACTION
export const CARD_ACTION_SUBTYPE_EPHEMERAL: string = "ephemeral";
export const CARD_ACTION_SUBTYPE_PERMANENT: string = "permanent";

// UTILITY FUNCTIONS

export function newCard(type: any) {
    let card: any = { id: uuidv4(), title: "test", illustration: defaultIllustration, lore: "Lore", effect: "" };

    if (type == ResourceCardType) {
        card.cardType = CARD_TYPE_NAME_RESOURCE;
        card.grade = "A";
        card.burnoutPoints = 3;
        card.cost = 25;
    } else if (type == CodirEventCardType) {
        card.cardType = CARD_TYPE_NAME_EVENT;
        // no additional property
    } else if (type == ActionCardType) {
        card.cardType = CARD_TYPE_NAME_ACTION;
        card.subType = CARD_ACTION_SUBTYPE_EPHEMERAL;
        // no additional property
    } else if (type == ProjectCardType) {
        card.cardType = CARD_TYPE_NAME_PROJECT;
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

// TYPES AND INTERFACES
export interface CardType {
    cardType: string;
    id: string;
    title: string;
    illustration: string;
    lore: string;
    effect: string;
}

export class ResourceCardType implements CardType {
    cardType: string;
    public id: string = uuidv4();
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effet";
    public grade: string = "A";
    public burnoutPoints: number = 3;
    public cost: number = 25;

    constructor(init?: Partial<ResourceCardType>) {
        Object.assign(this, init);
        this.cardType = CARD_TYPE_NAME_RESOURCE;
    }
}

export class CodirEventCardType implements CardType {
    cardType: string;
    public id: string = uuidv4();
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effet";

    constructor(init?: Partial<CodirEventCardType>) {
        Object.assign(this, init);
        this.cardType = CARD_TYPE_NAME_EVENT;
    }
}

export class ActionCardType implements CardType {
    cardType: string;
    public id: string = uuidv4();
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effet";
    public subType: string = CARD_ACTION_SUBTYPE_EPHEMERAL;

    constructor(init?: Partial<ActionCardType>) {
        Object.assign(this, init);
        this.cardType = CARD_TYPE_NAME_ACTION;
    }
}

export class ProjectCardType implements CardType {
    cardType: string;
    public id: string = uuidv4();
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "_Effect_";
    public client: string = "001";
    public optimalRevenue: number = 20;
    public baseRevenue: number = 10;
    public reputation: number = 1;
    public optimalStaffing: string[] = ["A", "B", "", "", "", ""];
    public penaltyThreshold: number = 3;
    public penaltyEffect: string = "";

    constructor(init?: Partial<ProjectCardType>) {
        Object.assign(this, init);
        this.cardType = CARD_TYPE_NAME_PROJECT;
    }
}

export const grades = [
    { value: "", color: "bg-transparent" },
    { value: "Stg", color: "bg-teal-300" },
    { value: "A", color: "bg-green-300" },
    { value: "B", color: "bg-sky-300" },
    { value: "C", color: "bg-yellow-300" },
    { value: "D", color: "bg-orange-300" },
    { value: "E", color: "bg-purple-300" },
    { value: "S", color: "bg-amber-300" },
];

export const actionTypes = [
    { value: CARD_ACTION_SUBTYPE_EPHEMERAL, color: "bg-white", icon: "material-symbols:link-rounded" },
    { value: CARD_ACTION_SUBTYPE_PERMANENT, color: "bg-white", icon: "material-symbols:link-off-rounded" },
];

type CardTypeIcons = Record<string, string>;
export const cardTypeIcons: CardTypeIcons = {
    [CARD_TYPE_NAME_RESOURCE]: "material-symbols:shopping-cart-outline-sharp",
    [CARD_TYPE_NAME_EVENT]: "material-symbols:local-activity-outline-sharp",
    [CARD_TYPE_NAME_ACTION]: "material-symbols:mode-fan",
    [CARD_TYPE_NAME_PROJECT]: "material-symbols:factory-outline",
}
