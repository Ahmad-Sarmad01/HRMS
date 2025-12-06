import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import FormGrid from "../../component/formFields/FormGrid";

const StaffAppointment: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const basicInformationFields = [
    { name: "refNo", label: "Ref No", type: "text", fieldSize: "small" },
    { name: "date", label: "Date", type: "date", fieldSize: "small" },
    {
      name: "staffName",
      label: "Staff Name",
      type: "text",
      required: true,
      fieldSize: "large",
    },
    { name: "designation", label: "Designation", type: "text", required: true },
    {
      name: "dateOfJoining",
      label: "Date of Joining",
      type: "date",
    },
    { name: "salary", label: "Salary", type: "text" },
    {
      name: "recruitmentType",
      label: "Recruitment Type",
      type: "select",
      required: true,
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

  const PillButton = ({
    children,
    index,
    onClick,
  }: {
    children: React.ReactNode;
    index: number;
    onClick: (i: number) => void;
  }) => {
    const isActive = index === activeBtn;

    return (
      <Box
        component="button"
        onClick={() => onClick(index)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: { xs: 1, sm: 2 },
          py: { xs: 0.25, sm: 0.5 },
          borderRadius: "12px",
          border: "1px solid var(--primary)",
          color: isActive ? "var(--text-light)" : "var(--primary)",
          bgcolor: isActive ? "var(--primary)" : "transparent",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: isActive
            ? "0 4px 8px rgba(0,0,0,0.2)"
            : "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: { xs: "0.75rem", sm: "0.95rem" },
          "&:hover": isActive
            ? { transform: "translateY(-2px)" }
            : {
                bgcolor: "var(--primary)",
                color: "var(--text-light)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
        }}
      >
        {React.Children.map(children, (child) => {
          if (typeof child === "string" || typeof child === "number") {
            return (
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                {child}
              </Box>
            );
          }
          return child;
        })}
      </Box>
    );
  };

  return (
    <>
      <Box sx={{ mt: 0 }}>
        <Box
          gap={1}
          height={{ xs: "auto", sm: 40 }}
          boxShadow="0 2px 6px rgba(0,0,0,0.05)"
          borderRadius={2}
          p={{ xs: 0.5, sm: 1 }}
          border="1px solid var(--primary)"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <PillButton index={0} onClick={(index) => setActiveBtn(index)}>
              <SaveIcon fontSize="small" />
              Save
            </PillButton>
            <PillButton index={1} onClick={(index) => setActiveBtn(index)}>
              <ArrowBackIcon fontSize="small" />
              Back
            </PillButton>
            <PillButton index={2} onClick={(index) => setActiveBtn(index)}>
              <SendIcon fontSize="small" />
              Submit for Approval
            </PillButton>
          </Box>

          <Box
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              color: "var(--primary)",
              pr: 1,
            }}
          >
            Staff Appointment Request
          </Box>
        </Box>
      </Box>

      {/* Form Sections */}
      <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <FormGrid
          fields={basicInformationFields}
          label="Basic Information"
          columns={4}
        />

        <FormGrid
          fields={newAppointmentDetailsFields}
          label="New Appointment Details"
          columns={4}
        />

        <FormGrid
          fields={visaConfirmationFields}
          label="Visa Confirmation"
          columns={4}
        />

        <FormGrid
          fields={documentDeclarationFields}
          label="Document Declaration"
          columns={2}
        />
      </Box>
    </>
  );
};

export default StaffAppointment;
