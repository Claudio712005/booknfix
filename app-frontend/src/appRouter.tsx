import LandingPage from "./pages/landing";

type AppRouter = {
   path: string;
   component: React.FC;
   hasAuth?: boolean;
   user: "common" | "enterprise" | "enterprise-admin" | "any";
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
        breadcrumb: {
            parent: "",
            name: "Home",
            icon: <i className="icon-dashboard" />
        }
    }
]