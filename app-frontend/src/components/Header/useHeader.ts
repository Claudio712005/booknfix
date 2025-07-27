import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const useHeader = () => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    
    const [isVisible, setIsVisible] = useState(false);

    const handleSignUpClick = () => {
        navigate("/auth");
    }

    return {
        t,
        isVisible,
        setIsVisible,
        handleSignUpClick,
        navigate
    }
}