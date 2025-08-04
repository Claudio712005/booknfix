import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { InputMask } from "primereact/inputmask";
import { ComponentProps, HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputTextProps = ComponentProps<typeof InputText>;
type PasswordInputProps = ComponentProps<typeof Password>;
type InputMaskProps = ComponentProps<typeof InputMask>;

export interface GenericInputProps<T extends FieldValues> {
    label?: string;
    error?: string;
    control?: Control<T>;
    name: Path<T>;
    InputTextProps?: Omit<InputTextProps, "name" | "type">;
    PasswordInputProps?: Omit<PasswordInputProps, "name" | "type">;
    InputMaskProps?: Omit<InputMaskProps, "name" | "type">;
    register?: UseFormRegister<T>;
    type?: HTMLInputTypeAttribute;
    mask?: string;
}

export interface GenericFormProps<TFormType, TFieldValues extends FieldValues> {
    onSubmit: (data: TFieldValues) => void;
    children: React.ReactNode;
}