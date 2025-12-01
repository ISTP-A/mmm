'use client'

import { useEffect, useId, useState } from "react"
import { cn } from "../lib/utils"

interface DayPickerProps {
    variant: 'single' | 'multiple'
    initialValues?: number[]
    onChange?: (value: number[]) => void
    onSubmit?: (value: number[]) => void
}

export function DayPicker({
    variant = 'multiple',
    initialValues = [],
    onChange,
}: DayPickerProps) {
    const id = useId()
    const [selectedValue, setSelectedValue] = useState<Set<number>>(new Set<number>(initialValues))
    const days = Array.from({ length: 31 }, (_, i) => i + 1)

    const onClick = (value: number) => {
        setSelectedValue(prev => {
            if (variant === 'single') {
                const next = new Set<number>()
                if (!prev.has(value)) next.add(value)
                return next
            }
            else {
                const next = new Set(prev)
                if (next.has(value)) next.delete(value)
                else next.add(value)
                return next
            }
        })
    }

    useEffect(() => {
        onChange?.(Array.from(selectedValue))
    }, [selectedValue])

    return (
        <div className="grid grid-cols-7 gap-3">
            {days.map((day) => {
                const selected = !!selectedValue.has(day)
                return (
                    <DayItem
                        key={id + day}
                        value={day}
                        selected={selected}
                        onClick={onClick}
                    />
                )
            })}
        </div>
    )
}

interface DayItemProps {
    value: number
    selected: boolean
    onClick: (value: number) => void
}

export function DayItem({ value, selected, onClick }: DayItemProps) {
    return (
        <p
            className={
                cn(
                    "flex items-center justify-center aspect-square bg-gray-100 rounded-full duration-100",
                    selected && "bg-primary text-primary-foreground"
                )
            }
            onClick={() => onClick(value)}
        >
            {value}
        </p>
    )
}