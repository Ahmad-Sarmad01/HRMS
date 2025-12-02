import { FC } from "react";
import FormGrid from "./FormGrid";

const DependantForm: FC = () => {
  const fields = [
    { name: "dependantName", label: "Dependant Name", type: "text", fieldSize: "large", required: false },
    { name: "relation", label: "Relation", type: "select", fieldSize: "normal", options: ["Spouse","Child","Parent"], required: false },
    { name: "dependantDob", label: "Dependant DOB", type: "date", fieldSize: "normal", required: false },
  ];

  return <FormGrid fields={fields} />;
};

export default DependantForm;
