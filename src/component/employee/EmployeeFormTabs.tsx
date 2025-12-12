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
import {
  OfficialForm,
  PersonalForm,
  DocumentsForm,
  GeneralForm,
  DependantForm,
  LeaveForm,
  FinanceForm,
  PayrollForm,
  OthersForm,
} from "../employeeForms";

interface EmployeeFormTabsProps {
  control: any;
  setupOptions: any;
}

const EmployeeFormTabs: FC<EmployeeFormTabsProps> = ({
  control,
  setupOptions,
}) => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
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
        variant="scrollable"
        scrollButtons="auto"
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
        <Tab
          icon={<DescriptionIcon />}
          iconPosition="start"
          label="Documents"
        />
        <Tab icon={<InfoIcon />} iconPosition="start" label="General" />
        <Tab icon={<PeopleIcon />} iconPosition="start" label="Dependant" />
        <Tab icon={<BeachAccessIcon />} iconPosition="start" label="Leave" />
        <Tab
          icon={<AccountBalanceWalletIcon />}
          iconPosition="start"
          label="Finance"
        />
        <Tab icon={<PaidIcon />} iconPosition="start" label="Payroll" />
        <Tab icon={<MoreHorizIcon />} iconPosition="start" label="Others" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tabValue === 0 && (
          <OfficialForm
            control={control}
            genderOptions={setupOptions.gender}
            visaTypeOptions={setupOptions.visaType}
            sectionOptions={setupOptions.section}
            visaSponsorOptions={setupOptions.visaSponsor}
            employmentTypeOptions={setupOptions.employmentType}
            lineManagerOptions={setupOptions.lineManager}
            labourCardStatusOptions={setupOptions.labourCardStatus}
            positionOptions={setupOptions.position}
            addResponsibilityOptions={setupOptions.addResponsibility}
            religionOptions={setupOptions.religion}
          />
        )}
        {tabValue === 1 && <PersonalForm control={control} />}
        {tabValue === 2 && <DocumentsForm control={control} />}
        {tabValue === 3 && <GeneralForm control={control} />}
        {tabValue === 4 && <DependantForm control={control} />}
        {tabValue === 5 && <LeaveForm control={control} />}
        {tabValue === 6 && <FinanceForm control={control} />}
        {tabValue === 7 && <PayrollForm control={control} />}
        {tabValue === 8 && <OthersForm control={control} />}
      </Box>
    </Box>
  );
};

export default EmployeeFormTabs;
