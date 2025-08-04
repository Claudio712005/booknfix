import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const ConfirmEmail: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <p className="text-sm text-gray-500 text-center mb-6">
                {t("auth.description")}
            </p>

            <div className="w-full flex flex-col gap-4">
                <InputText placeholder={t("auth.emailPlaceholder")} className="w-full" />

                <Button
                    icon="pi pi-envelope"
                    label={t("auth.continueWithEmail")}
                    severity="warning"
                    size="small"
                    className="w-full"
                />
            </div>

            <Divider className="my-6 text-sm">{t("auth.orContinueWith")}</Divider>

            <div className="flex gap-3">
                <Button
                    icon="pi pi-google"
                    rounded
                    severity="contrast"
                    aria-label={t("auth.google")}
                    size="large"
                />
                <Button
                    icon="pi pi-facebook"
                    rounded
                    severity="info"
                    aria-label={t("auth.facebook")}
                    size="large"
                />
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                {t("auth.agreementPrefix")}{" "}
                <a href="/termos" className="text-blue-500 hover:underline">
                    {t("auth.terms")}
                </a>{" "}
                {t("auth.and")}{" "}
                <a href="/privacidade" className="text-blue-500 hover:underline">
                    {t("auth.privacy")}
                </a>.
            </p>
        </>
    );
};

export default ConfirmEmail;
