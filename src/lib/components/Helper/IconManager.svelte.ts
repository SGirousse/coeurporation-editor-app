export const ICON_BATTERY: string = "battery";
export const ICON_HAPPYNESS: string = "happyness";
export const ICON_AWARD: string = "award";
export const ICON_KEURO: string = "keuro";
export const ICON_BASE_REVENUE: string = "rev-base";
export const ICON_OPTIMAL_REVENUE: string = "rev-opti";
export const ICON_REPUTATION: string = "reputation";
export const ICON_CARD_RSC: string = "card-rsc";
export const ICON_CARD_EVENT: string = "card-evt";
export const ICON_CARD_ACTION: string = "card-act";
export const ICON_CARD_PROJECT: string = "card-proj";

export const ICON_BASE: string = "base";
export const ICON_PLUS: string = "plus";
export const ICON_MINUS: string = "minus";

export const ICON_TYPE: string = "type";

export const ICON_TYPE_STANDARD: string = "standard";
export const ICON_TYPE_TEXT: string = "standard";

export const ICON_EFFECT_ONSTAFFING = "onstaffing";
export const ICON_EFFECT_PERMANENT = "permanent";


const ICON_COMMON_CLASSES = "PLACEHOLDER inline-block"

const ICONS: Record<string, Record<string, string>> = {
    [ICON_BATTERY]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22z"/></svg>`,
        [ICON_PLUS]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7.7q-.55.15-1.05.388t-.95.562V6H9v14h3.7q.125.55.363 1.05t.562.95zm8.4 0L15 20.6l2.1-2.1l-2.1-2.1l1.4-1.4l2.1 2.1l2.1-2.1l1.4 1.4l-2.075 2.1L22 20.6L20.6 22l-2.1-2.075z"/></svg>`,
        [ICON_MINUS]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M16 22v-3h-3v-2h3v-3h2v3h3v2h-3v3zm-8 0q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.2 0-.4.013t-.4.037q-2.2.3-3.7 1.975T11 18q0 1.125.4 2.15T12.525 22z"/></svg>`,
    },
    [ICON_HAPPYNESS]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></g></svg>`,
    },
    [ICON_AWARD]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 9a6 6 0 1 0 12 0A6 6 0 1 0 6 9"/><path d="m12 15l3.4 5.89l1.598-3.233l3.598.232l-3.4-5.889M6.802 12l-3.4 5.89L7 17.657l1.598 3.232l3.4-5.889"/></g></svg>`,
    },
    [ICON_KEURO]: {
        [ICON_TYPE]: ICON_TYPE_TEXT,
        [ICON_BASE]: "k€",
    },
    [ICON_BASE_REVENUE]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M15 21q-2.95 0-5.25-1.675T6.5 15H4q-.425 0-.712-.288T3 14t.288-.712T4 13h2.05Q6 12.725 6 12.5v-1q0-.225.05-.5H4q-.425 0-.712-.288T3 10t.288-.712T4 9h2.5q.95-2.65 3.25-4.325T15 3q1.425 0 2.675.413t2.35 1.137q.425.275.438.775t-.338.85t-.875.413t-.975-.213q-.725-.425-1.562-.65T15 5.5q-1.875 0-3.413.963T9.25 9H14q.425 0 .713.288T15 10t-.288.713T14 11H8.6q-.05.275-.075.5T8.5 12t.025.5t.075.5H14q.425 0 .713.288T15 14t-.288.713T14 15H9.25q.8 1.575 2.338 2.538T15 18.5q.875 0 1.713-.213t1.562-.637q.45-.275.975-.225t.875.4t.338.85t-.438.775q-1.1.725-2.35 1.138T15 21"/></svg>`,
    },
    [ICON_OPTIMAL_REVENUE]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M9 20v-1H7q-.425 0-.712-.288T6 18t.288-.712T7 17h1V7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h2V4q0-.425.288-.712T10 3t.713.288T11 4v1h2V4q0-.425.288-.712T14 3t.713.288T15 4v1.125q1.3.35 2.15 1.413T18 9q0 .725-.25 1.388t-.7 1.187q.875.525 1.413 1.425T19 15q0 1.65-1.175 2.825T15 19v1q0 .425-.287.713T14 21t-.712-.288T13 20v-1h-2v1q0 .425-.288.713T10 21t-.712-.288T9 20m1-9h4q.825 0 1.413-.587T16 9t-.587-1.412T14 7h-4zm0 6h5q.825 0 1.413-.587T17 15t-.587-1.412T15 13h-5z"/></svg>`,
    },
    [ICON_REPUTATION]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M7.1 11.35q.35-.7.725-1.35t.825-1.3l-1.4-.275l-2.1 2.1zm12.05-6.875q-1.75.05-3.737 1.025T11.8 8.1q-1.05 1.05-1.875 2.25T8.7 12.6l2.85 2.825q1.05-.4 2.25-1.225t2.25-1.875q1.625-1.625 2.6-3.6T19.675 5q0-.1-.038-.2t-.112-.175t-.175-.112t-.2-.038m-5.5 6q-.575-.575-.575-1.412t.575-1.413t1.425-.575t1.425.575t.575 1.413t-.575 1.412t-1.425.575t-1.425-.575m-.85 6.55L13.625 19l2.1-2.1l-.275-1.4q-.65.45-1.3.813t-1.35.712m8.775-13.35q.2 2.75-.9 5.363T17.2 14.025l.5 2.475q.1.5-.05.975t-.5.825L14 21.45q-.375.375-.9.288t-.725-.588l-1.525-3.575L6.575 13.3L3 11.775q-.5-.2-.6-.725t.275-.9L5.825 7q.35-.35.837-.5t.988-.05l2.475.5q2.375-2.375 4.988-3.475t5.362-.9q.2.025.4.113t.35.237t.238.35t.112.4m-17.65 12.3q.875-.875 2.138-.887t2.137.862t.863 2.138t-.888 2.137q-1.2 1.2-2.838 1.425t-3.287.45l.45-3.287q.225-1.637 1.425-2.838m1.425 1.4q-.425.425-.587 1.025T4.5 19.625q.625-.1 1.225-.25T6.75 18.8q.3-.3.325-.725T6.8 17.35t-.725-.288t-.725.313"/></svg>`
    },
    [ICON_CARD_RSC]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5zM5.2 4h16.5l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4H1V2h3.25zm3.35 7h7z"/></svg>`,
    },
    [ICON_CARD_EVENT]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="m9.2 16l2.8-2.1l2.75 2.1l-1.05-3.4l2.8-2.2h-3.4L12 7l-1.1 3.4H7.5l2.75 2.2zM2 20v-6q.825 0 1.413-.587T4 12t-.587-1.412T2 10V4h20v6q-.825 0-1.412.588T20 12t.588 1.413T22 14v6z"/></svg>`,
    },
    [ICON_CARD_ACTION]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M10.6 22q-1.275 0-1.937-.763T8 19.5q0-.65.288-1.263t.887-1.012q.55-.35.888-.9t.462-1.175l-.3-.15q-.15-.075-.275-.175l-2.3.825q-.425.15-.825.25T6 16q-1.575 0-2.788-1.375T2 10.6q0-1.275.763-1.937T4.475 8q.65 0 1.275.288t1.025.887q.35.55.9.887t1.175.463l.15-.3q.075-.15.175-.275l-.825-2.3q-.15-.425-.25-.825t-.1-.8q0-1.6 1.375-2.813T13.4 2q1.275 0 1.938.763T16 4.475q0 .65-.288 1.275t-.887 1.025q-.55.35-.887.9t-.463 1.175l.3.15q.15.075.275.175l2.3-.85q.425-.15.813-.237T17.975 8Q20 8 21 9.675t1 3.725q0 1.275-.8 1.938T19.425 16q-.625 0-1.213-.288t-.987-.887q-.35-.55-.9-.887t-1.175-.463l-.15.3q-.075.15-.175.275l.825 2.3q.15.4.25.763t.1.762q.025 1.625-1.35 2.875T10.6 22m1.4-8.5q.625 0 1.062-.437T13.5 12t-.437-1.062T12 10.5t-1.062.438T10.5 12t.438 1.063T12 13.5"/></svg>`,
    },
    [ICON_CARD_PROJECT]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="M2 22V9.975L9 7v2l5-2v3h8v12zm2-2h16v-8h-8V9.95l-5 2V10l-3 1.325zm7-2h2v-4h-2zm-4 0h2v-4H7zm8 0h2v-4h-2zm7-8h-5l1-8h3zM4 20h16z"/></svg>`,
    },
    [ICON_EFFECT_PERMANENT]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.828 9.172a4 4 0 1 0 0 5.656A10 10 0 0 0 12 12a10 10 0 0 1 2.172-2.828a4 4 0 1 1 0 5.656A10 10 0 0 1 12 12a10 10 0 0 0-2.172-2.828"/></svg>`,
    },
    [ICON_EFFECT_ONSTAFFING]: {
        [ICON_TYPE]: ICON_TYPE_STANDARD,
        [ICON_BASE]: `<svg xmlns="http://www.w3.org/2000/svg" class="${ICON_COMMON_CLASSES}" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10l-1.4-1.4L12.175 7H8V5h4.175l-1.6-1.6L12 2l4 4zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4z"/></svg>`,
    },
}

export function getIconValue(iconName: string, category: string = ICON_BASE, width: string = "w-4", height: string = "h-4"): string {
    const iconSizeClasses = `${width} ${height}`

    if (!(category in ICONS[iconName])) {
        // fallback value
        category = ICON_BASE;
    }

    return ICONS[iconName][category].replace("PLACEHOLDER", iconSizeClasses);
}