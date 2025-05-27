// translation.ts

const lang = "de";

export const translations: { [key: string]: { [lang: string]: string } } = {
    term: {
        en: "term",
        de: "Ausdruck"
    },
    definition: {
        en: "definition",
        de: "Definition"
    },
    weight: {
        en: "weight",
        de: "Gewicht"
    }
};

/**
 * Holt die Übersetzung für einen bestimmten Schlüssel und eine Sprache.
 * @param key Der Übersetzungsschlüssel
 * @param lang Die Sprachkennung (z.B. 'en', 'de')
 * @returns Die Übersetzung oder der Schlüssel, falls nicht gefunden
 */
export function tl(key: string): string {
    return translations[key]?.[lang] || key;
}