import { FC } from "react";
import FormGrid from "./FormGrid";

const FinanceForm: FC = () => {
  const fields = [
    { name: "bankName", label: "Bank Name", type: "text", fieldSize: "large", required: false },
    { name: "accountNo", label: "Account No", type: "text", fieldSize: "large", required: false },
    { name: "iban", label: "IBAN", type: "text", fieldSize: "large", required: false },
  ];

  return <FormGrid fields={fields}  />;
};

export default FinanceForm;
