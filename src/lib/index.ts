export interface CardType {
    cardType: string;
    title: string;
    illustration: string;
    lore: string;
    effect: string;
}

export class ResourceCardType implements CardType {
    cardType: string;
    public title: string = "";
    public illustration: string = "";
    public lore: string = "";
    public effect: string = "";
    public grade: string = "";
    public burnoutPoints: number = 0;
    public cost: number = 0;

    constructor(init?: Partial<ResourceCardType>) {
        Object.assign(this, init);
        this.cardType = 'ResourceCardType';
    }
}

export class CodirEventCardType implements CardType {
    cardType: string;
    title: string;
    illustration: string;
    lore: string;
    effect: string;

    constructor(title: string, illustration: string, lore: string, effect: string) {
        this.cardType = 'CodirEventCardType';
        this.title = title;
        this.illustration = illustration;
        this.lore = lore;
        this.effect = effect;
    }
}

export class ActionCardType implements CardType {
    cardType: string;
    title: string;
    illustration: string;
    lore: string;
    effect: string;

    constructor(title: string, illustration: string, lore: string, effect: string) {
        this.cardType = 'ActionCardType';
        this.title = title;
        this.illustration = illustration;
        this.lore = lore;
        this.effect = effect;
    }
}

export class ProjectCardType implements CardType {
    cardType: string;
    title: string;
    illustration: string;
    lore: string;
    effect: string;
    client: string;
    optimalRevenue: number;
    baseRevenue: number;
    comboClientThreshold: number;
    comboClientEffect: string;
    optimalStaffing: string[];
    penaltyThreshold: number;
    penaltyEffect: string;

    constructor(
        title: string, illustration: string, lore: string, effect: string, client: string, optimalRevenue: number, baseRevenue: number,
        comboClientThreshold: number, comboClientEffect: string, optimalStaffing: string[], penaltyThreshold: number, penaltyEffect: string
    ) {
        this.cardType = 'ProjectCardType';
        this.title = title;
        this.illustration = illustration;
        this.lore = lore;
        this.effect = effect;
        this.client = client;
        this.optimalRevenue = optimalRevenue;
        this.baseRevenue = baseRevenue;
        this.comboClientThreshold = comboClientThreshold;
        this.comboClientEffect = comboClientEffect;
        this.optimalStaffing = optimalStaffing;
        this.penaltyThreshold = penaltyThreshold;
        this.penaltyEffect = penaltyEffect;
    }
}