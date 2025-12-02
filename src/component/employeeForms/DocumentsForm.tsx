import { FC } from "react";
import FormGrid from "./FormGrid";

const DocumentsForm: FC = () => {
  const fields = [
    { name: "passportNo", label: "Passport No", type: "text", fieldSize: "normal", required: false },
    { name: "passportExpiry", label: "Passport Expiry", type: "date", fieldSize: "normal", required: false },
    { name: "visaNo", label: "Visa No", type: "text", fieldSize: "normal", required: false },
    { name: "visaExpiry", label: "Visa Expiry", type: "date", fieldSize: "normal", required: false },
  ];

  return <FormGrid fields={fields} />;
};

export default DocumentsForm;
