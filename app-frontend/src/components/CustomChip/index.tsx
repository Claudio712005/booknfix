import { Chip } from "primereact/chip";
import React from "react";

interface CustomChipProps {
    label: string;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const CustomChip: React.FC<CustomChipProps> = React.memo(({
    label,
    icon,
    className,
    onClick
}) => {
    const hasAction = Boolean(onClick);

    return (
        <Chip
            label={label}
            icon={icon}
            role={hasAction ? "button" : undefined}
            tabIndex={hasAction ? 0 : undefined}
            className={`
                ${className}
                ${hasAction && "cursor-pointer hover:bg-orange-500 transition-colors duration-200"}
                bg-orange-400
                text-white
            `}
            onClick={onClick}
        />
    );
});
