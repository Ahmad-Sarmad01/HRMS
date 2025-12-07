import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TableViewIcon from "@mui/icons-material/TableView";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
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
import {
  getDefaultFormValues,
  convertToAPIFormat,
} from "../../utils/fieldMapping";
import { employeeService } from "../../services/employeeService";
import { setupService, SetupOption } from "../../services/setupService";

const EmployeeRegistration: FC = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const [tabValue, setTabValue] = useState<number>(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  // Setup options state
  const [setupOptions, setSetupOptions] = useState<{
    status: SetupOption[];
    branch: SetupOption[];
    designation: SetupOption[];
    subStatus: SetupOption[];
    nationality: SetupOption[];
    gender: SetupOption[];
    visaType: SetupOption[];
    section: SetupOption[];
    visaSponsor: SetupOption[];
    employmentType: SetupOption[];
    lineManager: SetupOption[];
    labourCardStatus: SetupOption[];
    position: SetupOption[];
    addResponsibility: SetupOption[];
    religion: SetupOption[];
  }>({
    status: [],
    branch: [],
    designation: [],
    subStatus: [],
    nationality: [],
    gender: [],
    visaType: [],
    section: [],
    visaSponsor: [],
    employmentType: [],
    lineManager: [],
    labourCardStatus: [],
    position: [],
    addResponsibility: [],
    religion: [],
  });
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const menuOpen = Boolean(menuAnchorEl);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultFormValues(),
    mode: "onBlur",
  });

  // Fetch setup options on component mount
  useEffect(() => {
    const fetchSetupOptions = async () => {
      try {
        setIsLoadingOptions(true);
        const options = await setupService.getAllSetupOptions();
        setSetupOptions({
          status: options.status || [],
          branch: options.branch || [],
          designation: options.designation || [],
          subStatus: options.subStatus || [],
          nationality: options.nationality || [],
          gender: options.gender || [],
          visaType: options.visaType || [],
          section: options.section || [],
          visaSponsor: options.visaSponsor || [],
          employmentType: options.employmentType || [],
          lineManager: options.lineManager || [],
          labourCardStatus: options.labourCardStatus || [],
          position: options.position || [],
          addResponsibility: options.addResponsibility || [],
          religion: options.religion || [],
        });
      } catch (error) {
        console.error('Error loading setup options:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load dropdown options',
          severity: 'error',
        });
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchSetupOptions();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} clicked`);
    handleMenuClose();
  };

const onSubmit = async (data: any) => {
  try {
    setIsSubmitting(true);

    // Group the form data according to your internal form sections
    const fullFormData = {
      // Primary Info
      employeeName: data.employeeName ?? "",
      staffCode: data.staffCode ?? "",
      branch: data.branch ?? "",
      department: data.department ?? "",
      personalEmail: data.personalEmail ?? "",
      nationalityCountry: data.nationalityCountry ?? "",
      religion: data.religion ?? "",
      maritalStatus: data.maritalStatus ?? "",

      // Official Info
      designation: data.designation ?? "",
      joiningDate: data.joiningDate ?? "",
      employeeCategory: data.employeeCategory ?? "",
      officialEmail: data.officialEmail ?? "",
      status: data.status ?? "",
      employmentType: data.employmentType ?? "",
      probationDays: data.probationDays ?? "",
      resignationDate: data.resignationDate ?? "",
      adekStatus: data.adekStatus ?? "",
      contractExpiryDate: data.contractExpiryDate ?? "",
      labourCardStatus: data.labourCardStatus ?? "",
      addResponsibility: data.addResponsibility ?? "",
      lineManager1: data.lineManager1 ?? "",
      lineManager2: data.lineManager2 ?? "",
      probationEndDate: data.probationEndDate ?? "",
      noticePeriod: data.noticePeriod ?? "",
      adekDesignation: data.adekDesignation ?? "",
      currentGrade: data.currentGrade ?? "",
      position: data.position ?? "",
      specialty: data.specialty ?? "",
      rfid: data.rfid ?? "",

      // Personal Info
      arabicName: data.arabicName ?? "",
      uploadPhotoName: data.uploadPhotoName ?? "",
      idCard: data.idCard ?? "",
      dateOfBirth: data.dateOfBirth ?? "",
      emiratesIdNo: data.emiratesIdNo ?? "",
      emiratesIdExpiryDate: data.emiratesIdExpiryDate ?? "",
      actualJoiningDate: data.actualJoiningDate ?? "",
      gender: data.gender ?? "",
      visaSponsor: data.visaSponsor ?? "",
      visaDesignation: data.visaDesignation ?? "",
      lastWorkingDate: data.lastWorkingDate ?? "",
      modifiedBy: data.modifiedBy ?? "",
      modifiedDate: data.modifiedDate ?? "",
      tlsStatus: data.tlsStatus ?? "",
      tlsExpiryDate: data.tlsExpiryDate ?? "",
      remarks: data.remarks ?? "",
      signature: data.signature ?? "",
      moeRegistrationNo: data.moeRegistrationNo ?? "",
      companyID: data.companyID ?? "",
    };

    // Convert to API format (maps keys to backend keys)
    const apiBody = convertToAPIFormat(fullFormData);

    console.log("Submitting data:", apiBody);

    const response = await employeeService.createEmployee(apiBody as any);

    setSnackbar({
      open: true,
      message: "Employee registered successfully!",
      severity: "success",
    });

    reset();
    setTabValue(0);

    console.log("Response:", response);
  } catch (error: any) {
    console.error("Error submitting form:", error);
    setSnackbar({
      open: true,
      message:
        error.message || "Failed to register employee. Please try again.",
      severity: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePillButtonClick = (index: number, title: string) => {
    setActiveBtn(index);

    if (title === "New") {
      // Clear form to new
      reset();
      setTabValue(0);
    } else if (title === "Save") {
      // Trigger form submission
      handleSubmit(onSubmit)();
    } else if (title === "Back") {
      // Navigate to dashboard
      navigate("/dashboard");
    }
    // Handle other buttons (Edit, Search) as needed
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        gap={1}
        height={40}
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
          const isLastButton = i === TopPillButtonData.length - 1;

          return (
            <Box
              key={i}
              sx={{ position: isLastButton ? "relative" : "initial" }}
              onMouseEnter={isLastButton ? handleMenuOpen : undefined}
              onMouseLeave={isLastButton ? handleMenuClose : undefined}
            >
            <PillButton
              index={i}
              onClick={(index) => handlePillButtonClick(index, e.title)}
            >
              {isSubmitting && <CircularProgress size={16} sx={{ mr: 0.5 }} />}
              <Icon />
              {e.title}
            </PillButton>
            </Box>
          );
        })}
      </Box>

      {/* Hamburger Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          onMouseEnter: () => setMenuAnchorEl(menuAnchorEl),
          onMouseLeave: handleMenuClose,
        }}
        slotProps={{
          paper: {
            onMouseEnter: () => setMenuAnchorEl(menuAnchorEl),
            onMouseLeave: handleMenuClose,
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            mt: 0.5,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: 2,
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("Bulk upload")}
          sx={{
            py: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(217, 196, 140, 0.15)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon>
            <UploadFileIcon fontSize="small" sx={{ color: "#D9C48C" }} />
          </ListItemIcon>
          <ListItemText
            primary="Bulk upload"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#011527",
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Export to Excel")}
          sx={{
            py: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(217, 196, 140, 0.15)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon>
            <TableViewIcon fontSize="small" sx={{ color: "#10B981" }} />
          </ListItemIcon>
          <ListItemText
            primary="Export to Excel"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#011527",
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Export to PDF")}
          sx={{
            py: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(217, 196, 140, 0.15)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" sx={{ color: "#EF4444" }} />
          </ListItemIcon>
          <ListItemText
            primary="Export to PDF"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#011527",
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Print")}
          sx={{
            py: 1.5,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(217, 196, 140, 0.15)",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon>
            <PrintIcon fontSize="small" sx={{ color: "#86764e" }} />
          </ListItemIcon>
          <ListItemText
            primary="Print"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#011527",
            }}
          />
        </MenuItem>
      </Menu>

      {isLoadingOptions ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <PrimaryForm
          control={control}
          statusOptions={setupOptions.status}
          branchOptions={setupOptions.branch}
          designationOptions={setupOptions.designation}
          subStatusOptions={setupOptions.subStatus}
          nationalityOptions={setupOptions.nationality}
        />
      )}

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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EmployeeRegistration;
