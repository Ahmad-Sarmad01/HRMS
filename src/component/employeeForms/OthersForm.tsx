import { FC } from "react";
import { Box } from "@mui/material";
import FormGrid from "./FormGrid";

const OthersForm: FC = () => {
  const extraDetailsFields = [
    {
      name: "staffNameAsPerPassport",
      label: "Staff Name As Per Passport",
      type: "text",
      fieldSize: "large",
      required: false,
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "middleName",
      label: "Middle Name",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "terminalBenefitsNominee",
      label: "Terminal Benefits Nominee",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "contractType",
      label: "Contract Type",
      type: "select",
      fieldSize: "normal",
      options: ["Permanent", "Contract", "Temporary"],
      required: false,
    },
    {
      name: "nomineeRelation",
      label: "Nominee Relation",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "leaveCategory",
      label: "Leave Category",
      type: "select",
      fieldSize: "normal",
      options: ["Category A", "Category B", "Category C"],
      required: false,
    },
    {
      name: "rateIncrementByPercent",
      label: "Rate Increment By Percent",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "periodsPerWeek",
      label: "Periods Per Week",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "childTuition",
      label: "Child Tuition",
      type: "select",
      fieldSize: "normal",
      options: ["Yes", "No"],
      required: false,
    },
    {
      name: "memo",
      label: "Memo",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "machineId",
      label: "Machine ID",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "attendanceShift",
      label: "Attendance Shift",
      type: "select",
      fieldSize: "normal",
      options: ["Morning", "Evening", "Night"],
      required: false,
    },
    {
      name: "employeeBranch",
      label: "Employee Branch",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "specialRecognition",
      label: "Special Recognition",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "airTicketSector",
      label: "Air Ticket Sector",
      type: "select",
      fieldSize: "small",
      options: ["Economy", "Business", "First Class"],
      required: false,
    },
    {
      name: "ticketCount",
      label: "Ticket Count",
      type: "text",
      fieldSize: "small",
      required: false,
    },
    {
      name: "directReportingTo",
      label: "Direct Reporting To",
      type: "select",
      fieldSize: "normal",
      options: ["Manager", "Supervisor", "Director"],
      required: false,
    },
    {
      name: "noOfChildrenForTuition",
      label: "No. of Children For Tuition",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "replacement",
      label: "Replacement",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "programLeader",
      label: "Program Leader",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "equivalency",
      label: "Equivalency",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
  ];

  const benefitsFields = [
    {
      name: "transportation",
      label: "Transportation",
      type: "select",
      fieldSize: "normal",
      options: ["Provided", "Not Provided", "Allowance"],
      required: false,
    },
    {
      name: "insuranceEligibility",
      label: "Insurance Eligibility",
      type: "text",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "insuranceProvider",
      label: "Insurance Provider",
      type: "select",
      fieldSize: "normal",
      options: ["Provider A", "Provider B", "Provider C"],
      required: false,
    },
    {
      name: "schoolAccommodationProvided",
      label: "School Accommodation Provided",
      type: "select",
      fieldSize: "normal",
      options: ["Yes", "No"],
      required: false,
    },
    {
      name: "insuranceCategory",
      label: "Insurance Category",
      type: "select",
      fieldSize: "normal",
      options: ["Basic", "Standard", "Premium"],
      required: false,
    },
    {
      name: "ticketAmount",
      label: "Ticket Amount",
      type: "text",
      fieldSize: "small",
      required: false,
    },
    {
      name: "insuranceAmount",
      label: "Insurance Amount",
      type: "text",
      fieldSize: "small",
      required: false,
    },
    {
      name: "pensionAccount",
      label: "Pension Account",
      type: "select",
      fieldSize: "small",
      options: ["Active", "Inactive"],
      required: false,
    },
    {
      name: "pensionCategory",
      label: "Pension Category",
      type: "select",
      fieldSize: "small",
      options: ["Category 1", "Category 2", "Category 3"],
      required: false,
    },
    {
      name: "pension",
      label: "Pension",
      type: "checkbox",
      fieldSize: "small",
      required: false,
    },
    {
      name: "iloeDetails",
      label: "ILOE Details",
      type: "text",
      fieldSize: "small",
      required: false,
    },
    {
      name: "insuranceNo",
      label: "Insurance No",
      type: "text",
      fieldSize: "small",
      required: false,
    },
    {
      name: "insuranceExpDate",
      label: "Insurance Exp Date",
      type: "date",
      fieldSize: "small",
      required: false,
    },
  ];

  const cancellationDetailsFields = [
    {
      name: "visaCancelled",
      label: "Visa Cancelled",
      type: "select",
      fieldSize: "normal",
      options: ["Yes", "No"],
      required: false,
    },
    {
      name: "labourCardCancelled",
      label: "Labour Card Cancelled",
      type: "select",
      fieldSize: "normal",
      options: ["Yes", "No"],
      required: false,
    },
    {
      name: "visaCancelledDate",
      label: "Visa Cancelled Date",
      type: "date",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "labourCardCancelledDate",
      label: "Labour Card Cancelled Date",
      type: "date",
      fieldSize: "normal",
      required: false,
    },
  ];

  return (
    <Box>
      <FormGrid fields={extraDetailsFields} label="Extra Details" />
      <Box sx={{ mt: 3 }}>
        <FormGrid fields={benefitsFields} label="Benefits" />
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormGrid
          fields={cancellationDetailsFields}
          label="Cancellation Details"
          columns={2}
        />
      </Box>
    </Box>
  );
};

export default OthersForm;
