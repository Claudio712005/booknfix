import type React from "react";

type CommonLayoutProps = {
    children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {

    return (
        <div>
            <h1>Common Layout</h1>
            <p>This is the common layout of the application.</p>
            {children}
        </div>
    )
}

export default CommonLayout;