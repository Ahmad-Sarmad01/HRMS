import { FC } from "react";
import { Box, Typography } from "@mui/material";

const SubMaster: FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 700, 
            color: "#011527", 
            mb: 1,
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Sub Master
        </Typography>
        <Typography 
          variant="body2"
          sx={{ 
            color: "#86764e",
            fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
          }}
        >
          Configure subsidiary master data
        </Typography>
      </Box>
    </Box>
  );
};

export default SubMaster;
