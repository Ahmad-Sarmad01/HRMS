import { FC, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TopPillButtonData } from "./content";
import {
  PrimaryForm,
  OfficialForm,
  PersonalForm,
  DocumentsForm,
  GeneralForm,
  DependantForm,
  LeaveForm,
  FinanceForm,
  PayrollForm,
  OthersForm,
} from "../../component/employeeForms";

const EmployeeRegistration: FC = () => {
  const [activeBtn, setActiveBtn] = useState<number>(0); // track active button index
  const [tabValue, setTabValue] = useState<number>(0); // track active tab

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const PillButton = ({
    children,
    index,
    onClick,
  }: {
    children: React.ReactNode;
    index: number;
    onClick: (i: number) => void;
  }) => {
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
            ? { transform: "translateY(-2px)" }
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
      <Box
        gap={1}
        height={40}
        // width="100%"
        boxShadow="0 2px 6px rgba(0,0,0,0.05)"
        borderRadius={2}
        p={1}
        border="1px solid var(--primary)"
        display="flex"
        alignItems="center"
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
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
      
      <PrimaryForm />
      
      {/* Tabs Section */}
      <Box
        sx={{
          mt: 3,
          border: "1px solid #E5E7EB",
          borderRadius: 2,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: "1px solid #E5E7EB",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#86764e",
              minHeight: 48,
              "&.Mui-selected": {
                color: "#011527",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#D9C48C",
              height: 3,
            },
          }}
        >
          <Tab icon={<BadgeIcon />} iconPosition="start" label="Official" />
          <Tab icon={<PersonIcon />} iconPosition="start" label="Personal" />
          <Tab icon={<DescriptionIcon />} iconPosition="start" label="Documents" />
          <Tab icon={<InfoIcon />} iconPosition="start" label="General" />
          <Tab icon={<PeopleIcon />} iconPosition="start" label="Dependant" />
          <Tab icon={<BeachAccessIcon />} iconPosition="start" label="Leave" />
          <Tab icon={<AccountBalanceWalletIcon />} iconPosition="start" label="Finance" />
          <Tab icon={<PaidIcon />} iconPosition="start" label="Payroll" />
          <Tab icon={<MoreHorizIcon />} iconPosition="start" label="Others" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && <OfficialForm />}
          {tabValue === 1 && <PersonalForm />}
          {tabValue === 2 && <DocumentsForm />}
          {tabValue === 3 && <GeneralForm />}
          {tabValue === 4 && <DependantForm />}
          {tabValue === 5 && <LeaveForm />}
          {tabValue === 6 && <FinanceForm />}
          {tabValue === 7 && <PayrollForm />}
          {tabValue === 8 && <OthersForm />}
        </Box>
      </Box>
    </>
  );
};

export default EmployeeRegistration;
