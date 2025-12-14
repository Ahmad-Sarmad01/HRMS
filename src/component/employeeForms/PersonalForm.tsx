import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import FormGrid from "../formFields/FormGrid";
import { Box, Grid } from "@mui/material";

interface PersonalFormProps<T extends FieldValues> {
  control: Control<T>;
  disabled?: boolean;
}

const PersonalForm = <T extends FieldValues>({
  control,
  disabled = false,
}: PersonalFormProps<T>) => {
  const addressFields = [
    {
      name: "flatNoBuildingName",
      label: "Flat No/Building Name",
      type: "text",
      required: true,
    },
    { name: "streetName", label: "Street Name", type: "text", required: true },
    { name: "uaePhoneNo", label: "UAE Phone No", type: "text", required: true },
    { name: "area", label: "Area", type: "text", required: true },
    {
      name: "emirates",
      label: "Emirates",
      type: "select",
      options: [
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Ajman",
        "RAK",
        "Fujairah",
        "UAQ",
      ],
      required: true,
    },
    { name: "poBox", label: "P.O Box", type: "text", fieldSize: "small" },
    {
      name: "isApprover",
      label: "Is Approver",
      type: "checkbox",
      fieldSize: "small",
      required: true,
    },
  ];

  const homeCountryAddressFields = [
    { name: "homeAddress1", label: "Address 1", type: "text", required: true },
    { name: "homeAddress2", label: "Address 2", type: "text", required: true },
    {
      name: "homeCountry",
      label: "Country",
      type: "select",
      options: [
        "India",
        "Pakistan",
        "Bangladesh",
        "Nepal",
        "Philippines",
        "Other",
      ],
      required: true,
    },
    {
      name: "homeContactName",
      label: "Home Contact Name",
      type: "text",
      fieldSize: "small",
      required: true,
    },
    {
      name: "homeCountryContact",
      label: "Home Country Contact",
      type: "text",
      fieldSize: "small",
      required: true,
    },
  ];
  const emergencyContactFields = [
    { name: "emergencyName", label: "Name", type: "text", required: true },
    {
      name: "emergencyMobile",
      label: "Emergency Mobile",
      type: "text",
      required: true,
    },
    {
      name: "emergencyAddress",
      label: "Address",
      type: "text",
      required: true,
    },
    {
      name: "emergencyRelation",
      label: "Relation",
      type: "select",
      options: ["Father", "Mother", "Brother", "Sister", "Spouse", "Friend"],
      required: true,
    },
  ];
  const additionalInformationFields = [
    {
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: ["Single", "Married", "Widowed", "Divorced"],
      required: true,
    },
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    {
      name: "placeOfBirth",
      label: "Place Of Birth",
      type: "text",
      required: true,
    },
    {
      name: "countryOfBirth",
      label: "Country Of Birth",
      type: "select",
      options: [
        "India",
        "Pakistan",
        "Bangladesh",
        "Nepal",
        "Philippines",
        "Other",
      ],
      required: true,
    },
  ];
  const provisioningFields = [
    {
      name: "gratuityAs",
      label: "Gratuity As",
      type: "select",
      options: ["Basic Salary", "Gross Salary"],
      required: true,
    },
    {
      name: "gratuityStartDate",
      label: "Gratuity Start Date",
      type: "date",
      required: true,
    },
    {
      name: "gratuityEndDate",
      label: "Gratuity End Date",
      type: "date",
      required: true,
    },
    {
      name: "leaveSalaryAs",
      label: "Leave Salary As",
      type: "select",
      options: ["Basic Salary", "Gross Salary"],
      required: true,
    },
    {
      name: "insuranceAs",
      label: "Insurance As",
      type: "select",
      options: ["Company", "Self"],
      required: true,
    },
    {
      name: "ticketAs",
      label: "Ticket As",
      type: "select",
      options: ["Yearly", "Every 2 Years", "None"],
      required: true,
    },
  ];

  return (
    <Box>
      <FormGrid
        fields={addressFields}
        control={control}
        label="Address"
        disabled={disabled}
      />
      <Box sx={{ mb: 4 }} />

      <Grid container spacing={2}>
        <Grid size={{ md: 8, xs: 12 }}>
          <FormGrid
            fields={homeCountryAddressFields}
            control={control}
            label="Home Country Address"
            columns={2}
            disabled={disabled}
          />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <FormGrid
            fields={emergencyContactFields}
            control={control}
            label="Emergency Contact"
            columns={2}
            disabled={disabled}
          />
        </Grid>
      </Grid>
      <Box sx={{ mb: 4 }} />
      <Grid container spacing={2}>
        <Grid size={{ md: 4, xs: 12 }}>
          <FormGrid
            fields={additionalInformationFields}
            control={control}
            label="Additional Information"
            columns={2}
            disabled={disabled}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <FormGrid
            fields={provisioningFields}
            control={control}
            label="Provisioning"
            disabled={disabled}
          />
        </Grid>
      </Grid>
      <Box sx={{ mb: 4 }} />
    </Box>
  );
};

export default PersonalForm;
