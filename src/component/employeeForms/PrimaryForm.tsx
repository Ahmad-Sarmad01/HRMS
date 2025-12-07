import { Control, FieldValues } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import FormFieldSelector from "../formFields/FormFieldSelector";
import ImageInput from "../formFields/ImageInput";

interface SetupOption {
  id: string | number;
  name: string;
  [key: string]: any;
}

interface PrimaryFormProps<T extends FieldValues> {
  control: Control<T>;
  statusOptions?: SetupOption[];
  branchOptions?: SetupOption[];
  designationOptions?: SetupOption[];
  subStatusOptions?: SetupOption[];
  nationalityOptions?: SetupOption[];
}

const PrimaryForm = <T extends FieldValues>({
  control,
  statusOptions = [],
  branchOptions = [],
  designationOptions = [],
  subStatusOptions = [],
  nationalityOptions = [],
}: PrimaryFormProps<T>) => {
  // Convert API options to dropdown format
  const formatOptions = (options: SetupOption[]): string[] => {
    return options.map((option) => option.name || String(option.id));
  };

  const fields = [
    {
      name: "staffCode",
      label: "Staff Code",
      type: "text",
      fieldSize: "normal",
      required: true,
    },
    {
      name: "staffName",
      label: "Staff Name",
      type: "text",
      fieldSize: "large",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      fieldSize: "normal",
      options: formatOptions(statusOptions),
      required: true,
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      fieldSize: "normal",
      options: formatOptions(branchOptions),
      required: true,
    },
    {
      name: "joiningDate",
      label: "Joining Date",
      type: "date",
      fieldSize: "normal",
      required: true,
    },
    {
      name: "designation",
      label: "Designation",
      type: "select",
      fieldSize: "normal",
      options: formatOptions(designationOptions),
      required: true,
    },
    {
      name: "subStatus",
      label: "Sub Status",
      type: "select",
      fieldSize: "normal",
      options: formatOptions(subStatusOptions),
      required: false,
    },
    {
      name: "department",
      label: "Department",
      type: "select",
      fieldSize: "normal",
      options: ["IT", "HR", "Finance", "Operations"],
      required: true,
    },
    {
      name: "employeeCategory",
      label: "Employee Category",
      type: "select",
      fieldSize: "normal",
      options: ["Full-Time", "Part-Time", "Contractor"],
      required: false,
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "select",
      fieldSize: "normal",
      options: formatOptions(nationalityOptions),
      required: true,
    },
    {
      name: "uaeMobileNo",
      label: "UAE Mobile No",
      type: "text",
      fieldSize: "normal",
      inputMode: "numeric" as const,
      maxLength: 10,
      required: true,
    },
    {
      name: "personalEmail",
      label: "Personal Email",
      type: "email",
      fieldSize: "normal",
      required: true,
    },
    {
      name: "officialEmail",
      label: "Official Email",
      type: "email",
      fieldSize: "normal",
      required: false,
    },
    {
      name: "arabicName",
      label: "Arabic Name",
      type: "text",
      fieldSize: "large",
      required: false,
    },
  ];

  return (
    <Box>
      <Grid
        container
        spacing={2}
        mt={3}
        width={"100%"}
        sx={{ px: 2, border: "1px solid #E5E7EB", borderRadius: 2, py: 3 }}
      >
        {/* Main Form Section */}
        <Grid size={{ xs: 12, md: 9.6 }}>
          <Grid container spacing={2}>
            {fields.map((field) => {
              const isLarge = field.fieldSize === "large";
              return (
                <Grid
                  size={{ md: isLarge ? 6 : 3, sm: 6, xs: 12 }}
                  key={field.name}
                >
                  <FormFieldSelector field={field} control={control} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Image Field */}
        <Grid size={{ xs: 12, md: 2.4 }}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: "#F9FAFB",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <ImageInput
              name={"uploadPhotoName" as any}
              control={control}
              label="Employee Photo"
              required={false}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrimaryForm;
