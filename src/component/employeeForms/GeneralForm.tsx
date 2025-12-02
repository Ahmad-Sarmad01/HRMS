import { FC } from "react";
import FormGrid from "./FormGrid";

const GeneralForm: FC = () => {
  const fields = [
    { name: "maritalStatus", label: "Marital Status", type: "select", fieldSize: "normal", options: ["Single","Married","Other"], required: false },
    { name: "nationalId", label: "National ID", type: "text", fieldSize: "normal", required: false },
    { name: "religion", label: "Religion", type: "text", fieldSize: "normal", required: false },
  ];

  return <FormGrid fields={fields} />;
};

export default GeneralForm;
