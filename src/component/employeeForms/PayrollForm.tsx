import { FC } from "react";
import FormGrid from "./FormGrid";

const PayrollForm: FC = () => {
  const fields = [
    { name: "salaryStructure", label: "Salary Structure", type: "select", fieldSize: "normal", options: ["Monthly","Hourly"], required: false },
    { name: "basicSalary", label: "Basic Salary", type: "text", fieldSize: "normal", required: false },
  ];

  return <FormGrid fields={fields}/>;
};

export default PayrollForm;
