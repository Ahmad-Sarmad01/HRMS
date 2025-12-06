import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import FormGrid from "../formFields/FormGrid";

interface OfficialFormProps<T extends FieldValues> {
  control: Control<T>;
}

const OfficialForm = <T extends FieldValues>({
  control,
}: OfficialFormProps<T>) => {
  const fields = [
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "age", label: "Age", type: "text" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },

    {
      name: "visaType",
      label: "Visa Type",
      type: "select",
      options: ["Work", "Resident", "Visit"],
    },
    {
      name: "section",
      label: "Section",
      type: "select",
      options: ["Administration", "Finance", "Operations"],
    },
    {
      name: "visaSponsor",
      label: "Visa Sponsor",
      type: "select",
      options: ["Company", "Self", "Family"],
    },

    {
      name: "employmentType",
      label: "Employment Type",
      type: "select",
      options: ["Permanent", "Contract", "Temporary"],
    },
    {
      name: "lineManager1",
      label: "Line Manager 1",
      type: "select",
      options: ["Manager A", "Manager B", "Manager C"],
    },
    {
      name: "lineManager2",
      label: "Line Manager 2",
      type: "select",
      options: ["Manager D", "Manager E", "Manager F"],
    },

    { name: "probationDays", label: "Probation Days", type: "text" },
    { name: "probationEndDate", label: "Probation End Date", type: "date" },
    {
      name: "visaDesignation",
      label: "Visa Designation",
      type: "select",
      options: ["Teacher", "Administrator", "Technician"],
    },

    { name: "resignationDate", label: "Resignation Date", type: "date" },
    { name: "noticePeriod", label: "Notice Period", type: "text" },
    { name: "lastWorkingDate", label: "Last Working Date", type: "date" },

    {
      name: "adekStatus",
      label: "ADEK Status",
      type: "select",
      options: ["Registered", "Pending", "Not Registered"],
    },
    {
      name: "adekDesignation",
      label: "ADEK Designation",
      type: "select",
      options: ["Primary", "Secondary", "Other"],
    },
    { name: "currentGrade", label: "Current Grade", type: "text" },

    { name: "contractExpiryDate", label: "Contract Expiry Date", type: "date" },
    { name: "modifiedBy", label: "Modified By", type: "text" },
    { name: "modifiedDate", label: "Modified Date", type: "date" },

    {
      name: "labourCardStatus",
      label: "Labour Card Status",
      type: "select",
      options: ["Active", "Expired", "Pending"],
    },
    { name: "speciality", label: "Speciality", type: "text" },
    {
      name: "position",
      label: "Position",
      type: "select",
      options: ["Staff", "Supervisor", "Manager"],
    },

    {
      name: "additionalResponsibility",
      label: "Additional Responsibility",
      type: "select",
      options: ["Coordinator", "Mentor", "Safety Officer"],
    },
    { name: "rfid", label: "RFID", type: "text" },
    {
      name: "religion",
      label: "Religion",
      type: "select",
      options: ["Islam", "Christianity", "Hinduism", "Other"],
    },

    { name: "emiratesIdNo", label: "Emirates ID No", type: "text" },
    {
      name: "emiratesIdExpiryDate",
      label: "Emirates ID Expiry Date",
      type: "date",
    },
    { name: "moeRegistrationNo", label: "MOE Registration No", type: "text" },

    {
      name: "approvedFor",
      label: "Approved For",
      type: "select",
      options: ["All", "Shift A", "Shift B"],
    },
    {
      name: "tlsStatus",
      label: "TLS Status",
      type: "select",
      options: ["Valid", "Expired", "Not Required"],
    },
    { name: "tlsExpiryDate", label: "TLS Expiry Date", type: "date" },

    { name: "seniorityNo", label: "Seniority No", type: "text" },
    { name: "actualJoiningDate", label: "Actual Joining Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "text" },

    { name: "signature", label: "Signature", type: "file" },
  ];

  return <FormGrid fields={fields} control={control} />;
};

export default OfficialForm;
