import React from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import Footer from "@/components/Footer";

const BaseTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col w-full relative">
            <Header />
            <main className="flex-grow w-full relative">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    {children}
                </motion.div>
            </main>
            {location.pathname !== "/" && <Footer />}
        </div>
    );
};

export default BaseTemplate;
