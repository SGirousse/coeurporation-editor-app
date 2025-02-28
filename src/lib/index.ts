export interface CardType {
    cardType: string;
    title: string;
    illustration: string;
    lore: string;
    effect: string;
}

export class ResourceCardType implements CardType {
    cardType: string;
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effect";
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
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effect";

    constructor(init?: Partial<CodirEventCardType>) {
        Object.assign(this, init);
        this.cardType = 'CodirEventCardType';
    }
}

export class ActionCardType implements CardType {
    cardType: string;
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effect";

    constructor(init?: Partial<ActionCardType>) {
        Object.assign(this, init);
        this.cardType = 'ActionCardType';
    }
}

export class ProjectCardType implements CardType {
    cardType: string;
    public title: string = "Title";
    public illustration: string = "";
    public lore: string = "Lore";
    public effect: string = "Effect";
    public client: string = "";
    public optimalRevenue: number = 20;
    public baseRevenue: number = 10;
    public comboClientThreshold: number = 3;
    public comboClientEffect: string = "";
    public optimalStaffing: string[] = ["A", "B", "C"];
    public penaltyThreshold: number = 3;
    public penaltyEffect: string = "";

    constructor(init?: Partial<ProjectCardType>) {
        Object.assign(this, init);
        this.cardType = 'ProjectCardType';
    }
}