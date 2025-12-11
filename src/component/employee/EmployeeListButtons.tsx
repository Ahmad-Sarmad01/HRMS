import { FC } from "react";
import { Box } from "@mui/material";
import { Search, Menu as MenuIcon } from "lucide-react";
import PillButton from "../buttons/pillButton";

interface EmployeeListButtonsProps {
  activeBtn: number;
  onButtonClick: (index: number, title: string) => void;
  onMenuOpen?: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose?: () => void;
}

const buttonData = [
  {
    icon: Search,
    title: "Search",
  },
  {
    icon: MenuIcon,
    title: "",
  },
];

const EmployeeListButtons: FC<EmployeeListButtonsProps> = ({
  activeBtn,
  onButtonClick,
  onMenuOpen,
  onMenuClose,
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
        const isLastButton = i === buttonData.length - 1;

        return (
          <Box key={i} onMouseEnter={isLastButton ? onMenuOpen : undefined}>
            <PillButton
              index={i}
              onClick={(index) => onButtonClick(index, e.title)}
              isActive={i === activeBtn}
            >
              <Icon />
              {e.title}
            </PillButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default EmployeeListButtons;
