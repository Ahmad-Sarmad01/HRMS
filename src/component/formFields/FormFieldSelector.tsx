import { FC } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import FileInput from "./FileInput";
import CheckboxInput from "./CheckboxInput";

interface FormField {
  name: string;
  label: string;
  type: string;
  fieldSize?: string;
  required?: boolean;
  options?: string[];
  accept?: string[];
  placeholder?: string;
  inputMode?: "text" | "numeric" | "email";
  maxLength?: number;
}

interface FormFieldSelectorProps<T extends FieldValues> {
  field: FormField;
  control: Control<T>;
  disabled?: boolean;
}

const FormFieldSelector = <T extends FieldValues>({
  field,
  control,
  disabled = false,
}: FormFieldSelectorProps<T>) => {
  const fieldName = field.name as Path<T>;

  if (field.type === "select") {
    return (
      <SelectInput
        name={fieldName}
        control={control}
        label={field.label}
        options={field.options || []}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  if (field.type === "date") {
    return (
      <DateInput
        name={fieldName}
        control={control}
        label={field.label}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  if (field.type === "file") {
    return (
      <FileInput
        name={fieldName}
        control={control}
        label={field.label}
        accept={field.accept}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <CheckboxInput
        name={fieldName}
        control={control}
        label={field.label}
        required={field.required}
        disabled={disabled}
      />
    );
  }

  // Default: text or email
  return (
    <TextInput
      name={fieldName}
      control={control}
      label={field.label}
      type={field.type as "text" | "email" | "number" | "password"}
      placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
      required={field.required}
      inputMode={field.inputMode}
      maxLength={field.maxLength}
      disabled={disabled}
    />
  );
};

export default FormFieldSelector;
