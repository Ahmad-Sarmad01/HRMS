import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Plus, Save} from "lucide-react";
import PillButton from "../buttons/pillButton";

interface EmployeeRegistrationButtonsProps {
  activeBtn: number;
  isSubmitting: boolean;
  onButtonClick: (index: number, title: string) => void;
}

const buttonData = [
  {
    icon: Plus,
    title: "New",
  },
  {
    icon: Save,
    title: "Save",
  },
];

const EmployeeRegistrationButtons: FC<EmployeeRegistrationButtonsProps> = ({
  activeBtn,
  isSubmitting,
  onButtonClick,
}) => {
  return (
    <Box
      gap={1}
      p={1}
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      sx={{
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {buttonData.map((e, i) => {
        const Icon = e.icon;

        return (
          <PillButton
            key={i}
            index={i}
            onClick={(index) => onButtonClick(index, e.title)}
            isActive={i === activeBtn}
          >
            {isSubmitting && e.title === "Save" && (
              <CircularProgress size={16} sx={{ mr: 0.5 }} />
            )}
            <Icon />
            {e.title}
          </PillButton>
        );
      })}
    </Box>
  );
};

export default EmployeeRegistrationButtons;
