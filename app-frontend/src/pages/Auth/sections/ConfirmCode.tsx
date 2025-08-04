import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { InputOtp } from "primereact/inputotp";

const ConfirmCode: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <p className="text-sm text-gray-500 text-center mb-6">
                {t("auth.codeDescription") || "Insira o código que foi enviado para o seu e-mail."}
            </p>
            
            <div className="w-full flex flex-col gap-4 items-center">
                <InputOtp
                    length={6}
                />

                <Button
                    icon="pi pi-check"
                    label={t("auth.verifyCode") || "Confirmar Código"}
                    severity="warning"
                    size="small"
                    className="w-full"
                />
            </div>

            <div className="mt-6 text-sm text-gray-500 text-center items-center justify-center flex">
                <span className="mr-2">
                    {t("auth.didntReceive") || "Não recebeu o código?"}{" "}
                </span>
                <Button
                    text
                    icon="pi pi-refresh"
                    label={t("auth.resendCode")}
                />
            </div>
        </>
    );
};

export default ConfirmCode;
