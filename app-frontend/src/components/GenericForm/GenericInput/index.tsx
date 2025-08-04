import { Controller, FieldValues, Path } from "react-hook-form";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { GenericInputProps } from "../types";

export const GenericInput = <TFieldValues extends FieldValues>({
    label,
    error,
    control,
    name,
    register,
    type = "text",
    mask,
    ...props
}: GenericInputProps<TFieldValues>) => {
    return (
        <div className="w-full flex flex-col gap-2">
            {label && (
                <label htmlFor={name} className="font-medium text-sm">
                    {label}
                </label>
            )}

            {mask && control ? (
                <Controller
                    name={name as Path<TFieldValues>}
                    control={control}
                    render={({ field }) => (
                        <InputMask
                            {...field}
                            mask={mask}
                            {...props.InputMaskProps}
                            className={`w-full ${error ? "p-invalid" : ""}`}
                        />
                    )}
                />
            ) : type === "password" && control ? (
                <Controller
                    name={name as Path<TFieldValues>}
                    control={control}
                    render={({ field }) => (
                        <Password
                            {...field}
                            {...props.PasswordInputProps}
                            className={`w-full ${error ? "p-invalid" : ""}`}
                        />
                    )}
                />
            ) : mask ? (
                <InputMask
                    mask={mask}
                    {...props.InputMaskProps}
                    className={`w-full ${error ? "p-invalid" : ""}`}
                    {...(register ? register(name as Path<TFieldValues>) : {})}
                />
            ) : (
                <InputText
                    {...props.InputTextProps}
                    className={`w-full ${error ? "p-invalid" : ""}`}
                    type={type}
                    {...(register ? register(name as Path<TFieldValues>) : {})}
                />
            )}

            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};
