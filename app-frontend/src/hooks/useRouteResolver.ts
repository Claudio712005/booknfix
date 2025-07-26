import { appRouter } from "@/appRouter"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router"

export const useRouteResolver = () => {

    const location = useLocation()

    const { t } = useTranslation();

    useEffect(() => {
        const currentRoute = appRouter.find(route => route.path === location.pathname);

        if (currentRoute && currentRoute.breadcrumb.name) {
            document.title = "booknfix | " + t(currentRoute.breadcrumb.name);
        } else {
            document.title = 'booknfix';
        }
    }, [location, t]);

}