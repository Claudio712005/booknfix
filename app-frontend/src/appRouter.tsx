import LandingPage from "./pages/landing";
import { RiHome6Fill } from "react-icons/ri";

type AppRouter = {
    path: string;
    component: React.FC;
    hasAuth?: boolean;
    user: "common" | "enterprise" | "enterprise-admin" | "any";
    showInHeader?: boolean;
    showInFooter?: boolean;
    breadcrumb: {
        parent: string;
        name: string;
        icon?: React.ReactNode;
        iconClass?: string;
    }
}

export const appRouter: AppRouter[] = [
    {
        path: "/services",
        component: () => <div>Services Page</div>,
        hasAuth: true,
        user: "common",
        showInHeader: true,
        showInFooter: true,
        breadcrumb: {
            parent: "appRouter.home",
            name: "appRouter.services",
            icon: <RiHome6Fill />,
            iconClass: "pi pi-cog"
        }
    },
    {
        path: "/",
        component: LandingPage,
        hasAuth: false,
        user: "any",
        showInHeader: true,
        showInFooter: true,
        breadcrumb: {
            parent: "",
            name: "appRouter.home",
            icon: <RiHome6Fill />,
            iconClass: "pi pi-home"
        }
    }
]