import { TextField, type TextFieldProps } from "@mui/material";
import { MaskedInput } from "./MaskedInput";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from "react-hook-form";
import type { IMaskInput } from "react-imask";

type MaskedTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  maskProps: React.ComponentProps<typeof IMaskInput>;
  controllerProps?: Omit<UseControllerProps<T, Path<T>>, "control" | "name">;
} & Omit<
  TextFieldProps,
  "value" | "onChange" | "defaultValue" | "inputRef" | "name"
>;

export function MaskedTextField<T extends FieldValues>({
  control,
  name,
  label,
  maskProps,
  controllerProps,
  ...textFieldProps
}: MaskedTextFieldProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    ...controllerProps,
  });

  return (
    <TextField
      {...textFieldProps}
      label={label}
      required={!!controllerProps?.rules?.required}
      value={field.value ?? ""}
      inputRef={field.ref}
      onBlur={field.onBlur}
      onChange={field.onChange}
      error={!!fieldState.error}
      helperText={fieldState.error?.message ?? textFieldProps.helperText}
      slotProps={{
        ...textFieldProps.slotProps,
        input: {
          ...textFieldProps.slotProps?.input,
          inputComponent: MaskedInput,
          inputProps: {
            maskProps,
            onAccept: field.onChange,
          },
        },
      }}
    />
  );
}
