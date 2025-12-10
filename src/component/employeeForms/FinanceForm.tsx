import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import FormGrid from "../formFields/FormGrid";

interface FinanceFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
}

const FinanceForm = <T extends FieldValues>({
  control,
  disabled = false,
}: FinanceFormProps<T>) => {
  const fields = [
    {
      name: "paymentType",
      label: "Payment Type",
      type: "select",
      fieldSize: "normal",
      options: ["Bank Transfer", "Cash", "Cheque"],
      required: false,
    },
    {
      name: "paymentMode",
      label: "Payment Mode",
      type: "select",
      fieldSize: "normal",
      options: ["Monthly", "Weekly", "Daily"],
      required: true,
    },
    {
      name: "bankSwiftCode",
      label: "Bank Swift Code",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "molNumber",
      label: "MOL Number",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "routingCode",
      label: "Routing Code",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "salaryMode",
      label: "Salary Mode",
      type: "select",
      fieldSize: "normal",
      options: ["Fixed", "Variable", "Hourly"],
      required: true,
    },
    {
      name: "leaveSalary",
      label: "Leave Salary",
      type: "select",
      fieldSize: "normal",
      options: ["Paid", "Unpaid"],
      required: false,
    },
    {
      name: "leavePerYear",
      label: "Leave Per Year",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "ticketEligibility",
      label: "Ticket Eligibility",
      type: "select",
      fieldSize: "normal",
      options: ["Yes", "No"],
      required: false,
    },
    {
      name: "loanAccount",
      label: "Loan Account",
      type: "select",
      fieldSize: "normal",
      options: ["Active", "Inactive"],
      required: false,
    },
    {
      name: "accountGroup",
      label: "Account Group",
      type: "select",
      fieldSize: "normal",
      options: ["Group A", "Group B", "Group C"],
      required: false,
    },
    {
      name: "ticketPaymentMode",
      label: "Ticket Payment Mode",
      type: "select",
      fieldSize: "normal",
      options: ["Cash", "Reimbursement"],
      required: false,
    },
    {
      name: "financialRemarks",
      label: "Financial Remarks",
      type: "text",
      fieldSize: "large",
      required: false,
    },
    {
      name: "excludeFromPayroll",
      label: "Exclude From Payroll",
      type: "checkbox",
      fieldSize: "normal",
      required: false,
    },
  ];

  return <FormGrid fields={fields} control={control} disabled={disabled} />;
};

export default FinanceForm;
