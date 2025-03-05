
import { v4 as uuidv4 } from 'uuid';

import logo_cebocorp from "$lib/assets/companies/logo/001_cebocorp.png";
import logo_fullcarburant from "$lib/assets/companies/logo/002_fullcarburant.png";
import logo_etatfroncais from "$lib/assets/companies/logo/003_etatfroncais.png";
import logo_superkopter from "$lib/assets/companies/logo/004_superkopter.png";
import logo_laklass from "$lib/assets/companies/logo/005_laklass.png";
import logo_novosanst from "$lib/assets/companies/logo/006_novosanst.png";
import logo_telko from "$lib/assets/companies/logo/007_telko.png";
import logo_flycar from "$lib/assets/companies/logo/008_flycar.png";
import logo_turbomotor from "$lib/assets/companies/logo/009_turbomotor.png";
import logo_moulabank from "$lib/assets/companies/logo/010_moulabank.png";

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
    { value: "Stg", color: "bg-teal-500" },
    { value: "A", color: "bg-green-500" },
    { value: "B", color: "bg-blue-500" },
    { value: "C", color: "bg-yellow-500" },
    { value: "D", color: "bg-orange-500" },
    { value: "E", color: "bg-purple-500" },
    { value: "S", color: "bg-amber-500" },
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

export const clients = [
    { id: "001", name: "Cébo Corp", comboThreshold: 3, comboEffect: "", file: logo_cebocorp },
    { id: "002", name: "FullCarburant", comboThreshold: 3, comboEffect: "", file: logo_fullcarburant },
    { id: "003", name: "Etat Fronçais", comboThreshold: 5, comboEffect: "", file: logo_etatfroncais },
    { id: "004", name: "SuperKopter", comboThreshold: 3, comboEffect: "", file: logo_superkopter },
    { id: "005", name: "La Klass", comboThreshold: 3, comboEffect: "", file: logo_laklass },
    { id: "006", name: "Novo Sans T", comboThreshold: 3, comboEffect: "", file: logo_novosanst },
    { id: "007", name: "TELKO", comboThreshold: 3, comboEffect: "", file: logo_telko },
    { id: "008", name: "FlyCar", comboThreshold: 2, comboEffect: "", file: logo_flycar },
    { id: "009", name: "Turbo Motor", comboThreshold: 3, comboEffect: "", file: logo_turbomotor },
    { id: "010", name: "Moula Bank", comboThreshold: 3, comboEffect: "", file: logo_moulabank },
];
