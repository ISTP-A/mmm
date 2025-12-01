"use client"

import { cn } from "@/shared/lib/utils"
import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import { useController, useFormContext } from "react-hook-form"
import { Field, FieldLabel } from "../field"


type SelectItemElement<T> = ReactElement<{
    label: string
    value: T
    icon?: ReactNode
    selected?: boolean
    disabled?: boolean
    onClick?: (value: T) => void
}>

function isSelectItemElement<T>(child: any): child is SelectItemElement<T> {
    if (!isValidElement(child)) return false

    const props = child.props

    if (props === null || typeof props !== "object") return false

    if (!("value" in props)) return false
    if (!("label" in props)) return false

    return true
}


interface RHFItemSelectGroupProps<T> {
    name: string
    label: string
    children: ReactNode
    className?: string
    disabled?: boolean
    variant?: 'single' | 'multiple'
}

export function RHFItemSelectGroup<T>(props: RHFItemSelectGroupProps<T>) {
    const { name, label, children, className, disabled, variant = "single" } = props
    const { control, getValues } = useFormContext()
    const { field } = useController({ name, control })

    const isMultiple = variant === "multiple"

    const onMultipleChange = (value: T) => {
        const current: T[] = getValues(name) || []
        const set = new Set(current)
        if (set.has(value)) set.delete(value)
        else set.add(value)
        return Array.from(set)
    }

    const onSingleChange = (value: T) => {
        const prev = getValues(name)
        if (prev === value) return undefined
        return value
    }

    return (
        <Field>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <div className={className}>
                {Children.map(children, child => {
                    if (!isSelectItemElement<T>(child)) return child

                    const value = child.props.value
                    const selected = !isMultiple
                        ? field.value === value
                        : (field.value || []).some((prev: T) => prev === value)

                    return cloneElement(child, {
                        selected,
                        disabled,
                        onClick: () => {
                            if (disabled) return
                            if (isMultiple) {
                                field.onChange(onMultipleChange(value))
                            } else {
                                field.onChange(onSingleChange(value))
                            }
                        },
                    })
                })}
            </div>
        </Field>
    )
}



interface SelectItemProps<T> {
    label: string
    value: T
    icon?: ReactNode
    disabled?: boolean

    // Group에서 주입됨
    selected?: boolean
    onClick?: (value: T) => void
}


export function GridSelectItem<T>(props: SelectItemProps<T>) {
    const { label, value, icon, onClick, selected, disabled } = props
    return (
        <div
            className={
                cn(
                    "border p-3 rounded-md flex flex-col items-center justify-center duration-75",
                    "text-muted-foreground",
                    disabled && "bg-gray-100",
                    selected && "ring-1 text-primary font-medium ring-primary bg-primary/5",
                )
            }
            onClick={() => onClick?.(value)}
        >
            {icon && <div className="mb-1">{icon}</div>}
            <div className="text-center text-sm">
                <span>{label}</span>
            </div>
        </div>
    )
}

export function ListSelectItem<T>(props: SelectItemProps<T>) {
    return <></>
}