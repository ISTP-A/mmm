import { ComponentProps } from "react";
import { Button } from "./button";
import { cn } from "../lib/utils";

export function ButtonBottomCTA(props: ComponentProps<typeof Button>) {
    const { className, ...other } = props
    return (
        <Button
            className={cn('w-full', className)}
            size='xl'
            {...other}
        />
    )
}