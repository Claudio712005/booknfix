
import { useTranslation } from "react-i18next";
import { RegisterUser } from "./sections/RegisterUser";
// import ConfirmCode from "./sections/ConfirmCode";
// import ConfirmEmail from "./sections/ConfirmEmail";

const Auth: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full mx-auto mt-12 px-4 flex flex-col items-center">
            {/* <h1 className="text-2xl font-semibold text-center mb-2">
                {t("auth.title")} <span className="text-orange-500 font-bold">booknfix</span>
            </h1> */}

            {/* <ConfirmEmail /> */}
            {/* <ConfirmCode /> */}
            <RegisterUser />
        </div>
    );
};

export default Auth;
