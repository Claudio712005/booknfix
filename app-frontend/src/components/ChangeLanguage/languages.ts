import { Langs } from "@/types/common";

export interface Language {
    code: Langs;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: "en", name: "language.en", flag: "us" },
    { code: "pt", name: "language.pt", flag: "br" },
    { code: "fr", name: "language.fr", flag: "fr" },
    { code: "es", name: "language.es", flag: "es" }
];

export default languages;
