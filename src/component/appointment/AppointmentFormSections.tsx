import React from "react";
import { Box } from "@mui/material";
import { Control } from "react-hook-form";
import FormGrid from "../formFields/FormGrid";

interface AppointmentFormData {
  refNo: string;
  date: string;
  staffName: string;
  designation: string;
  dateOfJoining: string;
  salary: string;
  recruitmentType: string;
  status: string;
  numberOfClassesPerWeek: string;
  gradeLevelsAssigned: string;
  additionalResponsibility: string;
  currentVisaType: string;
  otherSpecify: string;
  currentVisaExpiryDate: string;
  requestedApprovalFor: string;
  documentsReceivedConfirmed: boolean;
  documentsPendingDetails: string;
}

interface AppointmentFormSectionsProps {
  control: Control<AppointmentFormData>;
}

const AppointmentFormSections: React.FC<AppointmentFormSectionsProps> = ({
  control,
}) => {
  const basicInformationFields = [
    {
      name: "refNo",
      label: "Ref No",
      type: "number",
      fieldSize: "small",
      required: true,
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      fieldSize: "small",
      required: true,
    },
    {
      name: "staffName",
      label: "Staff Name",
      type: "text",
      required: true,
      fieldSize: "large",
    },
    { name: "designation", label: "Designation", type: "text" },
    {
      name: "dateOfJoining",
      label: "Date of Joining",
      type: "date",
      required: true,
    },
    { name: "salary", label: "Salary", type: "text" },
    {
      name: "recruitmentType",
      label: "Recruitment Type",
      type: "select",
      options: ["New Hire", "Internal Transfer", "Contract", "Permanent"],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Pending", "On Hold", "Approved", "Rejected"],
    },
  ];

  const newAppointmentDetailsFields = [
    {
      name: "numberOfClassesPerWeek",
      label: "Number of Classes Per Week",
      type: "text",
    },
    {
      name: "gradeLevelsAssigned",
      label: "Grade Levels Assigned",
      type: "text",
    },
    {
      name: "additionalResponsibility",
      label: "Additional Responsibility",
      type: "text",
      fieldSize: "large",
    },
  ];

  const visaConfirmationFields = [
    {
      name: "currentVisaType",
      label: "Current Visa Type",
      type: "select",
      options: ["Employment Visa", "Visit Visa", "Residence Visa", "Other"],
    },
    { name: "otherSpecify", label: "Other (Specify)", type: "text" },
    {
      name: "currentVisaExpiryDate",
      label: "Current Visa Expiry Date",
      type: "date",
    },
    {
      name: "requestedApprovalFor",
      label: "Requested Approval For",
      type: "select",
      options: [
        "New Visa",
        "Visa Renewal",
        "Visa Transfer",
        "Visa Cancellation",
      ],
    },
  ];

  const documentDeclarationFields = [
    {
      name: "documentsReceivedConfirmed",
      label:
        "I, the undersigned HR Officer, confirm that all required documents have been received from the Candidate as per MOL/MOE/KHDA requirements.",
      type: "checkbox",
      fieldSize: "large",
    },
    {
      name: "documentsPendingDetails",
      label: "If any documents are pending, please specify here:",
      type: "text",
      placeholder: "Enter details of pending documents...",
    },
  ];

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <FormGrid
        fields={basicInformationFields}
        control={control}
        label="Basic Information"
        columns={4}
      />

      <FormGrid
        fields={newAppointmentDetailsFields}
        control={control}
        label="New Appointment Details"
        columns={4}
      />

      <FormGrid
        fields={visaConfirmationFields}
        control={control}
        label="Visa Confirmation"
        columns={4}
      />

      <FormGrid
        fields={documentDeclarationFields}
        control={control}
        label="Document Declaration"
        columns={2}
      />
    </Box>
  );
};

export default AppointmentFormSections;
