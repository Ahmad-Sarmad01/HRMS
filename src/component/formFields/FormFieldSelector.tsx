import { FC } from "react";
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
}

interface FormFieldSelectorProps {
  field: FormField;
}

const FormFieldSelector: FC<FormFieldSelectorProps> = ({ field }) => {
  if (field.type === "select") {
    return (
      <SelectInput
        label={field.label}
        options={field.options || []}
        required={field.required}
      />
    );
  }

  if (field.type === "date") {
    return <DateInput label={field.label} required={field.required} />;
  }

  if (field.type === "file") {
    return (
      <FileInput
        label={field.label}
        accept={field.accept}
        required={field.required}
      />
    );
  }

  if (field.type === "checkbox") {
    return <CheckboxInput label={field.label} required={field.required} />;
  }

  // Default: text or email
  return (
    <TextInput
      label={field.label}
      type={field.type as "text" | "email"}
      placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
      required={field.required}
    />
  );
};

export default FormFieldSelector;
