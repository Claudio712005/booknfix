import type React from "react";
import type { UserType } from "../@types/user-type";
import BaseTemplate from "./base";
import CommonLayout from "./common";

function withLayout(
    Component: React.FC,
    userType: UserType
): React.ReactElement {
    const Template: React.FC<{ children: React.ReactNode }> = BaseTemplate;

    let ChildTemplate: React.FC<{ children: React.ReactNode }> | null = null;

    if (userType === "common") {
        ChildTemplate = CommonLayout;
    }

    return (
        <Template>
            {ChildTemplate ? <ChildTemplate>{<Component />}</ChildTemplate> : <Component />}
        </Template>
    )
}

export const LayoutWrapper = ({ component: Component, user }: { component: React.FC, user: UserType }) => {
    return withLayout(Component, user);
};
