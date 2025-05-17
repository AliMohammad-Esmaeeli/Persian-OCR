import { Button } from "@heroui/react";


export default function _Button(props: any) {
    return (
        <Button
            variant="bordered"
            className="button"
            {...props}
        >
            {props.children}
        </Button>
    )
}
