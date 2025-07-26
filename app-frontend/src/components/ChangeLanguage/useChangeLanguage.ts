import { useState } from "react";
import languages, { Language } from "./languages";

export const useChangeLanguage = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const getActiveLanguage = () : Language => {
        const lang = localStorage.getItem('i18nextLng') || 'pt';
        return languages.find(language => language.code === lang) || languages[1];
    }
    
    return {
        isVisible,
        setIsVisible,
        getActiveLanguage
    }
}
