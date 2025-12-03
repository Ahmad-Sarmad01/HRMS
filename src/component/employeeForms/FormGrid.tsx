import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FormFieldSelector from "../formFields/FormFieldSelector";

interface FormField {
  name: string;
  label: string;
  type: string;
  fieldSize?: string;
  required?: boolean;
  options?: string[];
  accept?: string[];
  placeholder?: string;
}

interface FormGridProps {
  fields: FormField[];
  label?: string;
  columns?: 2 | 3 | 4;
}

const FormGrid: FC<FormGridProps> = ({ fields, label, columns = 3 }) => {
  const containerSx = label
    ? {
        p: 2,
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        backgroundColor: "#FAFAFA",
      }
    : {};

  return (
    <Box sx={containerSx}>
      {label && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#011527",
            mb: 2,
            fontSize: "1.1rem",
          }}
        >
          {label}
        </Typography>
      )}
      <Grid container spacing={2} width={"100%"} alignItems="center">
        {/* Main Form Section */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2} alignItems="center">
            {fields.map((field) => {
              const fieldSize = (field as any).fieldSize ?? "normal";
              const isLarge = fieldSize === "large";
              const isSmall = fieldSize === "small";

              // Calculate mdSize based on columns prop
              let mdSize: number;
              if (isSmall) {
                mdSize = columns === 2 ? 3 : 2;
              } else if (isLarge) {
                mdSize = columns === 2 ? 12 : columns === 3 ? 8 : 6;
              } else {
                mdSize = columns === 2 ? 6 : columns === 3 ? 4 : 3;
              }

              return (
                <Grid size={{ md: mdSize, sm: 6, xs: 12 }} key={field.name}>
                  <FormFieldSelector field={field} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormGrid;
