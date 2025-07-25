import { Heading } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {

    return (
        <header className="w-full px-10 bg-blue-600 text-white flex justify-between">
            <Heading
                as={"h1"}
                fontWeight={"bolder"}
                fontFamily={"monospace"}
            >
                booknFix
            </Heading>
            
        </header>
    )
}

export default Header;