import { FC } from "react";
import FormGrid from "./FormGrid";

const LeaveForm: FC = () => {
  const fields = [
    { name: "leavePolicy", label: "Leave Policy", type: "select", fieldSize: "normal", options: ["Annual","Sick","Unpaid"], required: false },
    { name: "entitlement", label: "Entitlement (days)", type: "text", fieldSize: "normal", required: false },
  ];

  return <FormGrid fields={fields} />;
};

export default LeaveForm;
