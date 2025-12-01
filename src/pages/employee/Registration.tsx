import { FC, useState } from "react";
import { Box, Grid } from "@mui/material";
import { TopPillButtonData } from "./content";
import { TextArea } from "../../component/inputField";

const EmployeeRegistration: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number>(0); // track active button index
    const textAreas = [
    {label: "Field 1", size: "normal" },
    {label: "Field 2", size: "large" },
    {label: "Field 3", size: "normal" },
    {label: "Field 4", size: "normal" },
    {label: "Field 5", size: "normal" },
    {label: "Field 6", size: "normal" },
    {label: "Field 6", size: "normal" },
    {label: "Field 4", size: "normal" },
    {label: "Field 5", size: "normal" },
    {label: "Field 6", size: "normal" },
    {label: "Field 6", size: "normal" },
    {label: "Field 6", size: "normal" },
    {label: "Field 6", size: "normal" },
    {label: "Field 6", size: "large" },
  ];
  
  const PillButton = ({children, index, onClick, }: { children: React.ReactNode; index: number; onClick: (i: number) => void; }) => {
  const isActive = index === activeBtn;
    
    return (
      <Box
        component="button"
        onClick={() => onClick(index)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 2,
          py: 0.5,
          borderRadius: "12px",
          border: "1px solid var(--primary)",
          color: isActive ? "var(--text-light)" : "var(--primary)",
          bgcolor: isActive ? "var(--primary)" : "transparent",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: isActive
            ? "0 4px 8px rgba(0,0,0,0.2)"
            : "0 2px 4px rgba(0,0,0,0.1)",
          "&:hover": isActive
            ? { transform: "translateY(-2px)",}
            : {
                bgcolor: "var(--primary)",
                color: "var(--text-light)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "translateY(-2px)",
              },
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <>
      <Box gap={1} height={40} width="95%" boxShadow="0 2px 6px rgba(0,0,0,0.05)" borderRadius={2} p={1} border="1px solid var(--primary)" display="flex" alignItems="center"
        sx={{ overflowX: "auto", scrollbarWidth: "none","&::-webkit-scrollbar": { display: "none",},}} >
        {TopPillButtonData.map((e, i) => {
          const Icon = e.icon;
          return (
            <PillButton
              key={i}
              index={i}
              onClick={(index) => setActiveBtn(index)}
            >
              <Icon />
              {e.title}
            </PillButton>
          );
        })}
      </Box>
      <Box>
    <Grid container spacing={2} mt={3} width={"100%"}>
        {textAreas.map((field) => {
        const isLarge = field.size === "large";
         return (
          <Grid size = {{md:isLarge ? 6 : 3, sm: 6, xs:6}} key={field.label}>
            <TextArea label={field.label} placeholder="Enter value" />
          </Grid>
        );
      })}
    </Grid>
      </Box>
    </>
  );
};

export default EmployeeRegistration;
