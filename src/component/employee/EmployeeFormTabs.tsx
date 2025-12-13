import { FC, useState, useMemo } from "react";
import { Box, Tabs, Tab, Badge } from "@mui/material";
import { FieldErrors } from "react-hook-form";
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
  errors?: FieldErrors;
}

const EmployeeFormTabs: FC<EmployeeFormTabsProps> = ({
  control,
  setupOptions,
  errors = {},
}) => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Define which fields belong to which tab
  const tabFieldMap = useMemo(
    () => ({
      0: [
        // Official
        "dateOfBirth",
        "age",
        "gender",
        "visaType",
        "section",
        "visaSponsor",
        "employmentType",
        "lineManager1",
        "lineManager2",
        "probationDays",
        "probationEndDate",
        "visaDesignation",
        "resignationDate",
        "noticePeriod",
        "lastWorkingDate",
        "adekStatus",
        "adekDesignation",
        "currentGrade",
        "contractExpiryDate",
        "modifiedBy",
        "modifiedDate",
        "labourCardStatus",
        "speciality",
        "position",
        "additionalResponsibility",
        "rfid",
        "religion",
        "emiratesIdNo",
        "emiratesIdExpiryDate",
        "moeRegistrationNo",
        "approvedFor",
        "tlsStatus",
        "tlsExpiryDate",
        "seniorityNo",
        "actualJoiningDate",
        "remarks",
        "signature",
      ],
      1: [
        // Personal
        "flatNoBuildingName",
        "streetName",
        "uaePhoneNo",
        "area",
        "emirates",
        "poBox",
        "isApprover",
        "homeAddress1",
        "homeAddress2",
        "homeCountry",
        "homeContactName",
        "homeCountryContact",
        "emergencyName",
        "emergencyMobile",
        "emergencyAddress",
        "emergencyRelation",
        "maritalStatus",
        "bloodGroup",
        "placeOfBirth",
        "countryOfBirth",
        "gratuityAs",
        "gratuityStartDate",
        "gratuityEndDate",
        "leaveSalaryAs",
        "insuranceAs",
        "ticketAs",
      ],
      2: [
        // Documents - Uses DataGrid, no form validation fields
      ],
      3: [
        // General - Uses DataGrid, no form validation fields
      ],
      4: [
        // Dependant - Uses DataGrid, no form validation fields
      ],
      5: [
        // Leave - Uses DataGrid, no form validation fields
      ],
      6: [
        // Finance
        "paymentType",
        "paymentMode",
        "bankSwiftCode",
        "molNumber",
        "routingCode",
        "salaryMode",
        "leaveSalary",
        "leavePerYear",
        "ticketEligibility",
        "loanAccount",
        "accountGroup",
        "ticketPaymentMode",
        "financialRemarks",
        "excludeFromPayroll",
      ],
      7: [
        // Payroll
        "basicSalary",
        "ministrySalary",
        "grossSalary",
        "accommodationAmount",
        "startDate1",
        "endDate1",
        "educationalReimbursement",
        "startDate2",
        "endDate2",
        "creditAccount",
        "ibanNo",
        "employeeBank",
      ],
      8: [
        // Others
        "staffNameAsPerPassport",
        "firstName",
        "middleName",
        "lastName",
        "terminalBenefitsNominee",
        "contractType",
        "nomineeRelation",
        "leaveCategory",
        "rateIncrementByPercent",
        "periodsPerWeek",
        "childTuition",
        "memo",
        "machineId",
        "attendanceShift",
        "employeeBranch",
        "specialRecognition",
        "airTicketSector",
        "ticketCount",
        "directReportingTo",
        "noOfChildrenForTuition",
        "replacement",
        "programLeader",
        "equivalency",
        "transportation",
        "insuranceEligibility",
        "insuranceProvider",
        "schoolAccommodationProvided",
        "insuranceCategory",
        "ticketAmount",
        "insuranceAmount",
        "pensionAccount",
        "pensionCategory",
        "pension",
        "iloeDetails",
        "insuranceNo",
        "insuranceExpDate",
        "visaCancelled",
        "labourCardCancelled",
        "visaCancelledDate",
        "labourCardCancelledDate",
        "idCard",
        "companyID",
      ],
    }),
    []
  );

  // Check if a tab has errors
  const hasTabErrors = useMemo(() => {
    const tabErrors: Record<number, boolean> = {};

    Object.entries(tabFieldMap).forEach(([tabIndex, fields]) => {
      const hasError = fields.some((field) => errors[field]);
      tabErrors[Number(tabIndex)] = hasError;
    });

    return tabErrors;
  }, [errors, tabFieldMap]);

  // Custom tab component with error indicator
  const TabWithError: FC<{
    icon: React.ReactElement;
    label: string;
    hasError: boolean;
    isActive: boolean;
  }> = ({ icon, label, hasError, isActive }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <span>{label}</span>
      {hasError && !isActive && (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            ml: 0.5,
          }}
        />
      )}
    </Box>
  );

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
        <Tab
          icon={<BadgeIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Official"
              hasError={hasTabErrors[0]}
              isActive={tabValue === 0}
            />
          }
        />
        <Tab
          icon={<PersonIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Personal"
              hasError={hasTabErrors[1]}
              isActive={tabValue === 1}
            />
          }
        />
        <Tab
          icon={<DescriptionIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Documents"
              hasError={hasTabErrors[2]}
              isActive={tabValue === 2}
            />
          }
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="General"
              hasError={hasTabErrors[3]}
              isActive={tabValue === 3}
            />
          }
        />
        <Tab
          icon={<PeopleIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Dependant"
              hasError={hasTabErrors[4]}
              isActive={tabValue === 4}
            />
          }
        />
        <Tab
          icon={<BeachAccessIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Leave"
              hasError={hasTabErrors[5]}
              isActive={tabValue === 5}
            />
          }
        />
        <Tab
          icon={<AccountBalanceWalletIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Finance"
              hasError={hasTabErrors[6]}
              isActive={tabValue === 6}
            />
          }
        />
        <Tab
          icon={<PaidIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Payroll"
              hasError={hasTabErrors[7]}
              isActive={tabValue === 7}
            />
          }
        />
        <Tab
          icon={<MoreHorizIcon />}
          iconPosition="start"
          label={
            <TabWithError
              icon={<></>}
              label="Others"
              hasError={hasTabErrors[8]}
              isActive={tabValue === 8}
            />
          }
        />
      </Tabs>

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
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
        </Box>
        <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
          <PersonalForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 2 ? "block" : "none" }}>
          <DocumentsForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 3 ? "block" : "none" }}>
          <GeneralForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 4 ? "block" : "none" }}>
          <DependantForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 5 ? "block" : "none" }}>
          <LeaveForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 6 ? "block" : "none" }}>
          <FinanceForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 7 ? "block" : "none" }}>
          <PayrollForm control={control} />
        </Box>
        <Box sx={{ display: tabValue === 8 ? "block" : "none" }}>
          <OthersForm control={control} />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeFormTabs;
