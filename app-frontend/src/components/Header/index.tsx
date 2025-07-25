import React from "react";
import Logo from "../Logo";
import { appRouter } from "@/appRouter";
import { Button } from "primereact/button";

const Header: React.FC = () => {

    return (
        <header className="w-full px-10 flex justify-between">
            <Logo size="lg" />

            <div>
                <Button
                    label="Login"
                    size="small"
                    onClick={() => {}}
                />
            </div>

            <nav className="flex items-center gap-4">
                {appRouter.map((route) => {
                    if (route.showInHeader) {
                        return (
                            <span key={route.path} className="flex items-center gap-2">
                                {route.breadcrumb.icon}
                                <a key={route.path} href={route.path}>
                                    {route.breadcrumb.name}
                                </a>
                            </span>
                        );
                    }
                })}
            </nav>
        </header>
    )
}

export default Header;