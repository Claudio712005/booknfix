import LandingPage from "./pages/Landing";
import { RiHome6Fill } from "react-icons/ri";
import Auth from "./pages/Auth";

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
    },
    {
        path: "/auth",
        component: Auth,
        hasAuth: false,
        user: "any",
        showInHeader: false,
        showInFooter: true,
        breadcrumb: {
            parent: "",
            name: "appRouter.auth",
            icon: <RiHome6Fill />,
            iconClass: "pi pi-user"
        }
    }
]