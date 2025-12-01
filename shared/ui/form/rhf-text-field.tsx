import { ComponentProps } from "react";
import { Input } from "../input";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../field";

export function RHFTextField({
    name,
    label,
    className,
    ...props
}: ComponentProps<typeof Input> & RHFFieldProps) {
    const form = useFormContext()
    return (
        <Controller
            name={name!}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                    <Input
                        {...field}
                        {...props}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}
