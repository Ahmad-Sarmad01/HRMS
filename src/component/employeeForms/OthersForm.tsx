import { FC } from "react";
import FormGrid from "./FormGrid";

const OthersForm: FC = () => {
  const fields = [
    { name: "notes", label: "Notes", type: "text", fieldSize: "large", required: false },
  ];

  return <FormGrid fields={fields} />;
};

export default OthersForm;
