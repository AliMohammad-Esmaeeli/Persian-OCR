import React from "react";
import { Button } from "@heroui/react";

interface SquareButtonProps {
    icon: string;
    text?: string;
}

const SquareButton = React.forwardRef<HTMLButtonElement, SquareButtonProps>(
    ({ icon, text, ...props }, ref) => (
        <Button
            {...props}
            ref={ref}
            className="square-button"
            variant="bordered"
        >
            <img className="size-6 stroke-white" src={icon} alt={text} />
            <p className="text-white sr-only">{text}</p>
        </Button>
    )
);

export default SquareButton;