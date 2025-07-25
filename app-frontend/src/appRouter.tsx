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
   }
}

export const appRouter: AppRouter[] = [
    {
        path: "/",
        component: LandingPage,
        hasAuth: false,
        user: "any",
        showInHeader: true,
        showInFooter: true,
        breadcrumb: {
            parent: "",
            name: "Home",
            icon: <RiHome6Fill/>
        }
    }
]