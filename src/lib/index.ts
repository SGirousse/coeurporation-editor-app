export interface CardType {
    title: string;
    illustration: string;
    lore: string;
    effect: string;
}

export interface ResourceCardType extends CardType {
    grade: string;
    burnoutPoints: number;
    cost: number;
}

export interface CodirEventCardType extends CardType {
}

export interface ActionCardType extends CardType {
}

export interface ProjectCardType extends CardType {
    client: string;
    optimalRevenue: number;
    baseRevenue: number;
    comboClientThreshold: number;
    comboClientEffect: string;
    optimalStaffing: string[];
    penaltyThreshold: number;
    penaltyEffect: string;
}