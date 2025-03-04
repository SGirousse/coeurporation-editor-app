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
    public comboClientThreshold: number = 3;
    public comboClientEffect: string = "_Combo client effect_";
    public optimalStaffing: string[] = ["A", "B", "", "", "", ""];
    public penaltyThreshold: number = 3;
    public penaltyEffect: string = "";

    constructor(init?: Partial<ProjectCardType>) {
        Object.assign(this, init);
        this.cardType = 'ProjectCardType';
    }
}