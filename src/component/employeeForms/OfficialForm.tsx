import { FC } from "react";
import FormGrid from "../formFields/FormGrid";

const OfficialForm: FC = () => {
  const fields = [
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "age", label: "Age", type: "text" },
    { name: "gender", label: "Gender", type: "select", options: [] },

    { name: "visaType", label: "Visa Type", type: "select", options: [] },
    { name: "section", label: "Section", type: "select", options: [] },
    { name: "visaSponsor", label: "Visa Sponsor", type: "select", options: [] },

    {
      name: "employmentType",
      label: "Employment Type",
      type: "select",
      options: [],
    },
    {
      name: "lineManager1",
      label: "Line Manager 1",
      type: "select",
      options: [],
    },
    {
      name: "lineManager2",
      label: "Line Manager 2",
      type: "select",
      options: [],
    },

    { name: "probationDays", label: "Probation Days", type: "text" },
    { name: "probationEndDate", label: "Probation End Date", type: "date" },
    {
      name: "visaDesignation",
      label: "Visa Designation",
      type: "select",
      options: [],
    },

    { name: "resignationDate", label: "Resignation Date", type: "date" },
    { name: "noticePeriod", label: "Notice Period", type: "text" },
    { name: "lastWorkingDate", label: "Last Working Date", type: "date" },

    { name: "adekStatus", label: "ADEK Status", type: "select", options: [] },
    {
      name: "adekDesignation",
      label: "ADEK Designation",
      type: "select",
      options: [],
    },
    { name: "currentGrade", label: "Current Grade", type: "text" },

    { name: "contractExpiryDate", label: "Contract Expiry Date", type: "date" },
    { name: "modifiedBy", label: "Modified By", type: "text" },
    { name: "modifiedDate", label: "Modified Date", type: "date" },

    {
      name: "labourCardStatus",
      label: "Labour Card Status",
      type: "select",
      options: [],
    },
    { name: "speciality", label: "Speciality", type: "text" },
    { name: "position", label: "Position", type: "select", options: [] },

    {
      name: "additionalResponsibility",
      label: "Additional Responsibility",
      type: "select",
      options: [],
    },
    { name: "rfid", label: "RFID", type: "text" },
    { name: "religion", label: "Religion", type: "select", options: [] },

    { name: "emiratesIdNo", label: "Emirates ID No", type: "text" },
    {
      name: "emiratesIdExpiryDate",
      label: "Emirates ID Expiry Date",
      type: "date",
    },
    { name: "moeRegistrationNo", label: "MOE Registration No", type: "text" },

    { name: "approvedFor", label: "Approved For", type: "select", options: [] },
    { name: "tlsStatus", label: "TLS Status", type: "select", options: [] },
    { name: "tlsExpiryDate", label: "TLS Expiry Date", type: "date" },

    { name: "seniorityNo", label: "Seniority No", type: "text" },
    { name: "actualJoiningDate", label: "Actual Joining Date", type: "date" },
    { name: "remarks", label: "Remarks", type: "text" },

    { name: "signature", label: "Signature", type: "file" },
  ];

  return <FormGrid fields={fields} />;
};

export default OfficialForm;
