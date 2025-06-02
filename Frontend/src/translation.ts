export const translations: { [key: string]: { [lang: string]: string } } = {
    page_homepage: {
        en: "Homepage",
        de: "Startseite",
    },
    page_add: {
        en: "Add",
        de: "Hinzufügen",
    },
    page_management: {
        en: "Management",
        de: "Verwaltung",
    },
    page_import: {
        en: "Import/Export",
        de: "Importieren/Exportieren",
    },
    card: {
        en: "flashcard",
        de: "Karteikarte",
    },
    cards: {
        en: "flashcards",
        de: "Karteikarten",
    },
    deck: {
        en: "deck",
        de: "Deck",
    },
    decks: {
        en: "decks",
        de: "Decks",
    },
    term: {
        en: "term",
        de: "Ausdruck",
    },
    term_up: {
        en: "Term",
        de: "Ausdruck",
    },
    definition: {
        en: "definition",
        de: "Definition",
    },
    definition_up: {
        en: "Definition",
        de: "Definition",
    },
    weight: {
        en: "weight",
        de: "Gewicht",
    },
    weight_up: {
        en: "Weight",
        de: "Gewicht",
    },
    insert_value: {
        en: "Insert <1>...",
        de: "<1> eingeben...",
    },
    no_value: {
        en: "<No Value>",
        de: "<Kein Wert>",
    },
    search: {
        en: "Search <1>...",
        de: "<1> durchsuchen...",
    },
    select: {
        en: "Select <1>",
        de: "<1> wählen",
    },
    edit: {
        en: "Edit <1>:",
        de: "<1> bearbeiten:",
    }
    /* Template:
    key: {
        en: "",
        de: "",
    },
    */
};

/**
 * Holt die Übersetzung für einen bestimmten Schlüssel und eine Sprache.
 * @param key Der Übersetzungsschlüssel
 * @param lang Die Sprachkennung (z.B. 'en', 'de')
 * @returns Die Übersetzung oder der Schlüssel, falls nicht gefunden
 */
export function tl(key: string, params?: string[]): string {
    let translation = translations[key]?.[localStorage.getItem("language") || "en"] || key
    if (params) {
        translation = params.reduce((str, param, idx) => str.replace(`<${idx + 1}>`, param), translation);
    }
    return translation;
}