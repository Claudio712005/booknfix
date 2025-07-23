import type React from "react";
import type { UserType } from "../types/user-type";
import BaseTemplate from "./base";
import CommonLayout from "./common";

export function withLayout(
    Component: React.FC,
    userType: UserType 
): React.ReactElement {
    let Template: React.FC<{children: React.ReactNode}> = BaseTemplate;

    if (userType === "common"){
        Template = CommonLayout;
    } else if (userType === "enterprise") {
        Template = BaseTemplate; 
    }

    return (
        <Template>
            <Component/>
        </Template>
    )
}