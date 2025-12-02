import { FC } from "react";
import FormGrid from "./FormGrid";
import { Box, Grid } from "@mui/material";

const PersonalForm: FC = () => {
  const addressFields = [
    {
      name: "flatNoBuildingName",
      label: "Flat No/Building Name",
      type: "text",
    },
    { name: "streetName", label: "Street Name", type: "text" },
    { name: "uaePhoneNo", label: "UAE Phone No", type: "text" },
    { name: "area", label: "Area", type: "text" },
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
    },
    { name: "poBox", label: "P.O Box", type: "text", fieldSize: "small" },
    {
      name: "isApprover",
      label: "Is Approver",
      type: "checkbox",
      fieldSize: "small",
    },
  ];

  const homeCountryAddressFields = [
    { name: "homeAddress1", label: "Address 1", type: "text" },
    { name: "homeAddress2", label: "Address 2", type: "text" },
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
    },
    {
      name: "homeContactName",
      label: "Home Contact Name",
      type: "text",
      fieldSize: "small",
    },
    {
      name: "homeCountryContact",
      label: "Home Country Contact",
      type: "text",
      fieldSize: "small",
    },
  ];
  const emergencyContactFields = [
    { name: "emergencyName", label: "Name", type: "text" },
    { name: "emergencyMobile", label: "Emergency Mobile", type: "text" },
    { name: "emergencyAddress", label: "Address", type: "text" },
    {
      name: "emergencyRelation",
      label: "Relation",
      type: "select",
      options: ["Father", "Mother", "Brother", "Sister", "Spouse", "Friend"],
    },
  ];
  const additionalInformationFields = [
    {
      name: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: ["Single", "Married", "Widowed", "Divorced"],
    },
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    { name: "placeOfBirth", label: "Place Of Birth", type: "text" },
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
    },
  ];
  const provisioningFields = [
    {
      name: "gratuityAs",
      label: "Gratuity As",
      type: "select",
      options: ["Basic Salary", "Gross Salary"],
    },
    { name: "gratuityStartDate", label: "Gratuity Start Date", type: "date" },
    { name: "gratuityEndDate", label: "Gratuity End Date", type: "date" },
    {
      name: "leaveSalaryAs",
      label: "Leave Salary As",
      type: "select",
      options: ["Basic Salary", "Gross Salary"],
    },
    {
      name: "insuranceAs",
      label: "Insurance As",
      type: "select",
      options: ["Company", "Self"],
    },
    {
      name: "ticketAs",
      label: "Ticket As",
      type: "select",
      options: ["Yearly", "Every 2 Years", "None"],
    },
  ];

  return (
    <Box>
      <FormGrid fields={addressFields} lable="Address" />
      <Box sx={{ mb: 4 }} />

      <Grid container spacing={2}>
        <Grid size={{ md: 8, xs: 12 }}>
          <FormGrid
            fields={homeCountryAddressFields}
            lable="Home Country Address"
            columns={2}
          />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
          <FormGrid
            fields={emergencyContactFields}
            lable="Emergency Contact"
            columns={2}
          />
        </Grid>
      </Grid>
      <Box sx={{ mb: 4 }} />
      <Grid container spacing={2}>
        <Grid size={{ md: 4, xs: 12 }}>
          <FormGrid
            fields={additionalInformationFields}
            lable="Additional Information"
            columns={2}
          />
        </Grid>
        <Grid size={{ md: 8, xs: 12 }}>
          <FormGrid fields={provisioningFields} lable="Provisioning" />
        </Grid>
      </Grid>
      <Box sx={{ mb: 4 }} />
    </Box>
  );
};

export default PersonalForm;
