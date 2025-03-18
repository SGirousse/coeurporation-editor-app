

import { clients } from "$lib/components/Cards/ResourceCard.svelte";

import { v4 as uuidv4 } from 'uuid';
export function newClient() {
    return { uuid: uuidv4(), id: `${(clients.clients.length + 1).toString().padStart(3, "0")}`, name: "", illustration: "", comboThreshold: 0, comboEffect: "" };
}