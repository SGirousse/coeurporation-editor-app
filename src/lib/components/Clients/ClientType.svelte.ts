import { v4 as uuidv4 } from 'uuid';

export function newClient(nbOfClients: number = 0) {
    return { uuid: uuidv4(), id: `${(nbOfClients + 1).toString().padStart(3, "0")}`, name: "", illustration: "", comboThreshold: 0, comboEffect: "" };
}

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

