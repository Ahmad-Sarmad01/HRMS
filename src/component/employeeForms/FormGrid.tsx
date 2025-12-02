import { FC } from "react";
import { Box, Grid } from "@mui/material";
import FormFieldSelector from "../formFields/FormFieldSelector";
import ImageInput from "../formFields/ImageInput";

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
}

const FormGrid: FC<FormGridProps> = ({
  fields,
}) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        width={"100%"}
      >
        {/* Main Form Section */}
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {fields.map((field) => {
              const fieldSize = field.fieldSize ?? "normal";
              const isLarge = fieldSize === "large";
              return (
                <Grid
                  size={{ md: isLarge ? 8 : 4, sm: 6, xs: 12 }}
                  key={field.name}
                >
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
