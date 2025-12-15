import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import FormGrid from "../formFields/FormGrid";

interface SetupOption {
  id: string | number;
  name: string;
  [key: string]: any;
}

interface OfficialFormProps<T extends FieldValues> {
  control: Control<T>;
  genderOptions?: SetupOption[];
  visaTypeOptions?: SetupOption[];
  sectionOptions?: SetupOption[];
  visaSponsorOptions?: SetupOption[];
  employmentTypeOptions?: SetupOption[];
  lineManagerOptions?: SetupOption[];
  labourCardStatusOptions?: SetupOption[];
  positionOptions?: SetupOption[];
  addResponsibilityOptions?: SetupOption[];
  religionOptions?: SetupOption[];
  disabled?: boolean;
}

const OfficialForm = <T extends FieldValues>({
  control,
  genderOptions = [],
  visaTypeOptions = [],
  sectionOptions = [],
  visaSponsorOptions = [],
  employmentTypeOptions = [],
  lineManagerOptions = [],
  labourCardStatusOptions = [],
  positionOptions = [],
  addResponsibilityOptions = [],
  religionOptions = [],
  disabled = false,
}: OfficialFormProps<T>) => {
  // Convert API options to dropdown format
  const formatOptions = (options: SetupOption[]): string[] => {
    return options.map((option) => option.name || String(option.id));
  };

  const fields = [
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: false,
    },
    { name: "age", label: "Age", type: "text", required: false },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: formatOptions(genderOptions),
    },

    {
      name: "visaType",
      label: "Visa Type",
      type: "select",
      options: formatOptions(visaTypeOptions),
      required: false,
    },
    {
      name: "section",
      label: "Section",
      type: "select",
      options: formatOptions(sectionOptions),
    },
    {
      name: "visaSponsor",
      label: "Visa Sponsor",
      type: "select",
      options: formatOptions(visaSponsorOptions),
      required: false,
    },

    {
      name: "employmentType",
      label: "Employment Type",
      type: "select",
      options: formatOptions(employmentTypeOptions),
    },
    {
      name: "lineManager1",
      label: "Line Manager 1",
      type: "select",
      options: formatOptions(lineManagerOptions),
    },
    {
      name: "lineManager2",
      label: "Line Manager 2",
      type: "select",
      options: formatOptions(lineManagerOptions),
    },

    {
      name: "probationDays",
      label: "Probation Days",
      type: "text",
      required: false,
    },
    {
      name: "probationEndDate",
      label: "Probation End Date",
      type: "date",
      required: false,
    },
    {
      name: "visaDesignation",
      label: "Visa Designation",
      type: "select",
      options: ["Teacher", "Administrator", "Technician"],
      required: false,
    },

    {
      name: "resignationDate",
      label: "Resignation Date",
      type: "date",
      required: false,
    },
    {
      name: "noticePeriod",
      label: "Notice Period",
      type: "text",
      required: false,
    },
    {
      name: "lastWorkingDate",
      label: "Last Working Date",
      type: "date",
      required: false,
    },

    {
      name: "adekStatus",
      label: "ADEK Status",
      type: "select",
      options: ["Registered", "Pending", "Not Registered"],
      required: false,
    },
    {
      name: "adekDesignation",
      label: "ADEK Designation",
      type: "select",
      options: ["Primary", "Secondary", "Other"],
      required: false,
    },
    { name: "currentGrade", label: "Current Grade", type: "text" },

    {
      name: "contractExpiryDate",
      label: "Contract Expiry Date",
      type: "date",
      required: false,
    },
    { name: "modifiedBy", label: "Modified By", type: "text", required: false },
    {
      name: "modifiedDate",
      label: "Modified Date",
      type: "date",
      required: false,
    },

    {
      name: "labourCardStatus",
      label: "Labour Card Status",
      type: "select",
      options: formatOptions(labourCardStatusOptions),
      required: false,
    },
    { name: "speciality", label: "Speciality", type: "text" },
    {
      name: "position",
      label: "Position",
      type: "select",
      options: formatOptions(positionOptions),
    },

    {
      name: "additionalResponsibility",
      label: "Additional Responsibility",
      type: "select",
      options: formatOptions(addResponsibilityOptions),
    },
    { name: "rfid", label: "RFID", type: "text", required: false },
    {
      name: "religion",
      label: "Religion",
      type: "select",
      options: formatOptions(religionOptions),
    },

    {
      name: "emiratesIdNo",
      label: "Emirates ID No",
      type: "text",
      required: false,
    },
    {
      name: "emiratesIdExpiryDate",
      label: "Emirates ID Expiry Date",
      type: "date",
      required: false,
    },
    {
      name: "moeRegistrationNo",
      label: "MOE Registration No",
      type: "text",
      required: false,
    },

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
      required: false,
    },
    {
      name: "tlsExpiryDate",
      label: "TLS Expiry Date",
      type: "date",
      required: false,
    },

    {
      name: "seniorityNo",
      label: "Seniority No",
      type: "text",
      required: false,
    },
    {
      name: "actualJoiningDate",
      label: "Actual Joining Date",
      type: "date",
      required: false,
    },
    { name: "remarks", label: "Remarks", type: "text" },

    { name: "signature", label: "Signature", type: "file" },
  ];

  return <FormGrid fields={fields} control={control} disabled={disabled} />;
};

export default OfficialForm;
