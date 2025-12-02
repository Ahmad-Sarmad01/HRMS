import { FC } from "react";
import FormGrid from "./FormGrid";

const PersonalForm: FC = () => {
  const fields = [
    { name: "firstName", label: "First Name", type: "text", fieldSize: "large", required: true },
    { name: "lastName", label: "Last Name", type: "text", fieldSize: "large", required: true },
    { name: "dob", label: "Date of Birth", type: "date", fieldSize: "normal", required: true },
    { name: "gender", label: "Gender", type: "select", fieldSize: "normal", options: ["Male","Female","Other"], required: false },
  ];

  return <FormGrid fields={fields} />;
};

export default PersonalForm;
