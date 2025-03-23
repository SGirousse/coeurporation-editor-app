export const CARD_THEMES = [
    {
        name: "default",
        mainColor: "black",
        accentuationColor: "black",
        outerBorder: "black",
        ligthTextColor: "white",
        darkTextColor: "black"
    },
    {
        name: "clear",
        mainColor: "white",
        accentuationColor: "white",
        outerBorder: "black",
        ligthTextColor: "black",
        darkTextColor: "black"
    },
    {
        name: "crapgemigniii",
        mainColor: "#0070AD",
        accentuationColor: "#17ABDA",
        outerBorder: "#0070AD",
        ligthTextColor: "white",
        darkTextColor: "black"
    },
];

export let currentCardTheme = $state({ value: CARD_THEMES[1] });

export function switchTheme(themeName?: string) {
    if (themeName) {
        currentCardTheme.value =
            CARD_THEMES.find((theme) => theme.name == themeName) ||
            CARD_THEMES[0];
    } else {
        const index = CARD_THEMES.findIndex(
            (theme) => theme.name == currentCardTheme.value.name,
        );
        currentCardTheme.value = CARD_THEMES[(index + 1) % CARD_THEMES.length];
    }
}