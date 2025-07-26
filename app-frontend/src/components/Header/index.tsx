import React, { useState } from "react";
import Logo from "../Logo";
import { appRouter } from "@/appRouter";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../ChangeLanguage";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";

const Header: React.FC = () => {
    const { t } = useTranslation();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return (
        <>
            <header className="w-full px-4 md:px-10 py-4 flex items-center justify-between shadow-sm bg-white flex-wrap gap-2">
                <div className="flex items-center gap-4">
                    <Button
                        icon="pi pi-bars"
                        severity="warning"
                        onClick={() => setSidebarVisible(true)}
                        className="w-10 h-10 p-0 flex justify-center items-center md:hidden"
                    />
                    <Logo size="lg" />
                </div>

                <div className="flex-1 hidden min-[500px]:block max-w-sm">
                    <InputText
                        placeholder={t("header.searchPlaceholder")}
                        className="w-full text-sm h-9"
                    />
                </div>


                <div className="hidden md:flex items-center gap-4 flex-wrap">
                    <nav className="flex items-center gap-2 flex-wrap">
                        {appRouter.map((route) =>
                            route.showInHeader ? (
                                <Button
                                    key={route.path}
                                    label={t(route.breadcrumb.name)}
                                    icon={route.breadcrumb.iconClass}
                                    size="small"
                                    severity="warning"
                                    text
                                    onClick={() => { }}
                                />
                            ) : null
                        )}
                    </nav>

                    <Divider layout="vertical" className="h-6" />

                    <ChangeLanguage />

                    <Divider layout="vertical" className="h-6" />

                    <Button
                        label={t("header.login")}
                        size="small"
                        onClick={() => { }}
                        severity="warning"
                        outlined
                        icon="pi pi-sign-in"
                    />
                    <Button
                        label={t("header.signup")}
                        size="small"
                        onClick={() => { }}
                        severity="warning"
                        icon="pi pi-user-plus"
                    />
                </div>
            </header>

            <Sidebar
                visible={sidebarVisible}
                onHide={() => setSidebarVisible(false)}
                position="left"
                className="w-80"
            >
                <div className="space-y-4">
                    <div className="my-4 flex items-center justify-center">
                        <Logo size="3xl" />
                    </div>

                    <div className="flex items-center gap-2">
                        <InputText
                            placeholder={t("header.searchPlaceholder")}
                            className="w-full text-sm"
                        />
                        <ChangeLanguage />
                    </div>

                    <Divider />

                    <nav className="flex flex-col gap-2">
                        {appRouter.map((route) =>
                            route.showInHeader ? (
                                <Button
                                    key={route.path}
                                    label={t(route.breadcrumb.name)}
                                    icon={route.breadcrumb.iconClass}
                                    size="small"
                                    severity="warning"
                                    onClick={() => setSidebarVisible(false)}
                                />
                            ) : null
                        )}
                    </nav>

                    <Divider />

                    <div className="flex flex-col gap-2">
                        <Button
                            label={t("header.login")}
                            size="small"
                            onClick={() => { }}
                            severity="warning"
                            outlined
                            icon="pi pi-sign-in"
                        />
                        <Button
                            label={t("header.signup")}
                            size="small"
                            onClick={() => { }}
                            severity="warning"
                            icon="pi pi-user-plus"
                        />
                    </div>
                </div>
            </Sidebar>
        </>
    );
};

export default Header;
