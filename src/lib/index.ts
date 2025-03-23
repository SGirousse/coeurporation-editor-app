
import { v4 as uuidv4 } from 'uuid';

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
        this.cardType = 'ResourceCardType';
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
        this.cardType = 'CodirEventCardType';
    }
}

export class ActionCardType implements CardType {
    cardType: string;
    public id: string = uuidv4();
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effet";
    public subType: string = "ephemeral";

    constructor(init?: Partial<ActionCardType>) {
        Object.assign(this, init);
        this.cardType = 'ActionCardType';
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
        this.cardType = 'ProjectCardType';
    }
}

export const grades = [
    { value: "", color: "bg-white" },
    { value: "Stg", color: "bg-teal-300" },
    { value: "A", color: "bg-green-300" },
    { value: "B", color: "bg-sky-300" },
    { value: "C", color: "bg-yellow-300" },
    { value: "D", color: "bg-orange-300" },
    { value: "E", color: "bg-purple-300" },
    { value: "S", color: "bg-amber-300" },
];

export const actionTypes = [
    { value: "ephemeral", color: "bg-white", icon: "tabler:link" },
    { value: "permanent", color: "bg-white", icon: "tabler:brand-linktree" },
];


export class ClientType {
    public uuid: string = uuidv4();
    public id: string = "000"
    public name: string = ""
    public illustration: string = "";
    public comboThreshold: number = 0
    public comboEffect: string = ""

    constructor(init?: Partial<ClientType>) {
        Object.assign(this, init);
    }
}

