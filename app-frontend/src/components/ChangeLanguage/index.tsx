import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useTranslation } from "react-i18next";
import languages from "./languages";
import { useChangeLanguage } from "./useChangeLanguage";
import i18n from "@/i18n";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";

const ChangeLanguage: React.FC = () => {
    const { t } = useTranslation();
    const { isVisible, setIsVisible, getActiveLanguage } = useChangeLanguage();

    const activeLang = getActiveLanguage();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsVisible(false);
    };

    return (
        <>
            <Button
                onClick={() => setIsVisible(true)}
                rounded
                outlined
                tooltip={t("changeLanguage.change")}
                tooltipOptions={{ position: "bottom" }}
                className="border-none"
            >
                <img
                    src={`https://flagcdn.com/w40/${activeLang.flag}.png`}
                    alt={activeLang.name}
                    className="w-6"
                />
            </Button>

            <Sidebar
                visible={isVisible}
                onHide={() => setIsVisible(false)}
                position="left"
                className="w-full max-w-[90vw] sm:w-20rem md:w-25rem"
            >
                <h3 className="text-primary mb-3">{t("changeLanguage.change")}</h3>

                <Divider align="left" className="my-3">
                    <div className="flex items-center gap-2">
                        <img
                            src={`https://flagcdn.com/w40/${activeLang.flag}.png`}
                            alt={activeLang.name}
                            className="w-5"
                        />
                        <span className="text-lg font-semibold">{t(activeLang.name)}</span>
                    </div>
                </Divider>

                <Fieldset legend={t("changeLanguage.available")} className="mt-4">
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                        {languages.map((language) => {
                            const isActive = language.code === activeLang.code;

                            return (
                                <Button
                                    key={language.code}
                                    disabled={isActive}
                                    size="small"
                                    outlined={isActive}
                                    onClick={() => changeLanguage(language.code)}
                                    className="gap-2 flex items-center justify-start"
                                    icon={isActive ? "pi pi-check" : undefined}
                                >
                                    <img
                                        src={`https://flagcdn.com/w40/${language.flag}.png`}
                                        alt={language.name}
                                        className="w-5"
                                    />
                                    <span className="text-sm sm:text-base">{t(language.name)}</span>
                                    <span className="text-sm sm:text-base font-bold">({language.code.toUpperCase()})</span>
                                </Button>
                            );
                        })}
                    </div>
                </Fieldset>
            </Sidebar>
        </>
    );
};

export default ChangeLanguage;
